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
        self.program = False
        self.scenetime = scenetime
        self.fadetime = fadetime
        self.fadefactor = fadefactor
        self.current = ''
        self.scenes = False

    def play_program(self):
        #decrease the values with this function so that the every value decreases at the same rate
        decreaser = np.vectorize(lambda v: floor(v - self.fadefactor *(v/255)))
        #increase every value at the same rate
        increaser = np.vectorize(lambda v, d: ceil(v + self.fadefactor * (d / 255)))
        #loop through the scenes of the current program
        for sc in self.scenes:
            #check for fadetime
            if not self.fadetime:
                self.send_data("2", sc.s_data)
                time.sleep(self.scenetime)

            elif self.fadetime:
                #turn the DMX-data into a numpy array for faster and easier maths etc
                arr = np.array(sc.s_data.split(',')).astype(int)
                #try except because the prev_scene variable has to be initialised later
                #and the function would raise an error otherwise
                try:
                    delta = arr - prev_scene
                    #while the max difference between the array with max 20's and the current scene data is higher than 1
                    #apply the increaser function to every value of the 20's array and send the data to the interface
                    while np.max(arr - prev_scene) >= 1:
                        prev_scene = increaser(prev_scene, delta)
                        prev_scene[prev_scene < 0] = 0
                        prev_scene[prev_scene > 255] = 255
                        #data needs to be sent as a string
                        self.send_data("2", ','.join(prev_scene.astype(str)))

                except UnboundLocalError:
                    self.send_data("2", sc.s_data)

                self.send_data("2", ','.join(arr.astype(str)))                        
                time.sleep(self.scenetime)
                #while the max difference between the array values and 20 is higher than 0 
                #apply the decreaser function to every value of the current scene's array    
                while arr[arr > 20].size > 0:
                    arr[arr > 20] = decreaser(arr[arr > 20])
                    self.send_data("2", ','.join(arr.astype(str)))
                #copy the current scenes array because it will be overwritten with the next scene's data
                prev_scene = arr.copy()
                       


    def calc_fadetime(self, x):
        #measured the amount of time it takes to fade, plotted the data and made a regression on my calculator
        try:
            self.fadetime =  8.447*x**(-.935)
        except ZeroDivisionError:
            self.fadetime = 0
            print(self.fadetime)
        
        self.fadefactor = x
        return self.fadetime

    def load_program(self, program):
        #check if there's currently a program running
        if self.program:
            self.scenes = []
            self.stop_program()
            self.program = Program(program)
            #store the scenes in a list for less database calls later
            for scene in self.program:
                sc = Scenes.query.filterBy(s_name=scene).first()
                self.scenes.append(sc)
        else:
            self.scenes = []
            self.program = Program(program)
            for scene in self.program:
                sc = Scenes.query.filterBy(s_name=scene).first()
                self.scenes.append(sc)


    def start_program(self):
        #start the program in another thread 
        self.program.start_program()
        thread = threading.Thread(target=self.play_program)
        thread.start()


    def stop_program(self):
        if self.program:
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