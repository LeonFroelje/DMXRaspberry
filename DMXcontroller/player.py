import threading
import time
import subprocess
from DMXcontroller.models import Scenes


class ProgramPlayer():
    play = False
    program = [1,2,3,4,5,6,7,8,9]
    timer = 0.1
    fadetime = 0

    def play_program(self):
        if self.fadetime:
            while self.play:
                for scene in self.program:
                    sc = Scenes.query.filter_by(s_name=scene).first()
                    subprocess.run(['ola_streaming_client', '-u 2', '-d ' + sc.s_data])

    

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