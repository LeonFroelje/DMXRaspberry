from functools import reduce
from operator import sub
import threading
import time
import subprocess
import numpy as np
from math import ceil, floor
from DMXcontroller.models import Scenes, Program


class ProgramPlayer():
    def __init__(self, scenetime, fadetime=0, fadefactor=0):
        self.program = None
        self.scenetime = scenetime
        self.fadetime = fadetime
        self.fadefactor = fadefactor
        self.current = ''

    def play_program(self):
        reducer = np.vectorize(lambda v: floor(v - self.fadefactor *(v/255)))
        increaser = np.vectorize(lambda v, d: ceil(v + self.fadefactor * (d / 255)))
        for scene in self.program:
            print(self.fadetime)
            if not self.fadetime:
                sc = Scenes.query.filter_by(s_name=scene).first()
                subprocess.run(['ola_streaming_client', '-u 2', '-d ' + sc.s_data])
                time.sleep(self.scenetime)

            elif self.fadetime:
                sc = Scenes.query.filter_by(s_name=scene).first()
                arr = np.array(sc.s_data.split(',')).astype(int)

                try:
                    delta = arr - prev_scene
                    while np.max(arr - prev_scene) >= 1:
                        prev_scene = increaser(prev_scene, delta)
                        prev_scene[prev_scene < 0] = 0
                        prev_scene[prev_scene > 255] = 255
                        subprocess.run(['ola_streaming_client', '-u 2', '-d ' + ','.join(prev_scene.astype(str))])

                except UnboundLocalError:
                    subprocess.run(['ola_streaming_client', '-u 2', '-d ' + sc.s_data])

                subprocess.run(['ola_streaming_client', '-u 2', '-d ' + ','.join(arr.astype(str))])                        
                time.sleep(self.scenetime)
                    
                while arr[arr > 20].size > 0:
                    arr[arr > 20] = reducer(arr[arr > 20])
                    subprocess.run(['ola_streaming_client', '-u 2', '-d ' + ','.join(arr.astype(str))])
                prev_scene = arr.copy()
                       


    def calc_fadetime(self, x):
        try:
            self.fadetime =  8.447*x**(-.935)
        except ZeroDivisionError:
            self.fadetime = 0
            print(self.fadetime)
        
        self.fadefactor = x
        return self.fadetime

    def load_program(self, program):
        if self.program:
            self.stop_program()
            self.program = program
        else:
            self.program = Program(program)

    def start_program(self):
        self.program.start_program()
        thread = threading.Thread(target=self.play_program)
        thread.start()


    def stop_program(self):
        self.program.stop_program()

    @staticmethod
    def send_data(universe, data):
        subprocess.run(['ola_streaming_client', f'-u {universe}', '-d ' + data])

        
    

    

if __name__ == "__main__":
    player = ProgramPlayer()
    print(player.play)
    player.play = True
    t1 = threading.Thread(target=player.play_program)
    t1.daemon = True
    t1.start()
    time.sleep(0.01)
    player.play = False
    print("penis")
    player.play = True