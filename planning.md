# Browser-Based-Game

I would like to create a browser based battleship game
Here is the wireframe:

![image](https://github.com/bsong1124/Browser-Based-Game/assets/146983073/bcadae98-f451-4f45-8755-75def4d5c86d)



Pseudocode below: **JavaScript**

1. Set up variables to link each element of the DOM. Use boolean value to determine current attacker->AddEventListeners

2. Create a class of Player for player/computer: will contain properties of ship and grid
   - ```
      class Player{
        .grid{[a-i], [1-9] -> grid creation here}
        .ship{name,length,hitpoints}
      }

3. Create a grid inside Player class: Use a loop to iterate through xAxis and yAxis->create element and append to container
   - ```
         for(x in xAxis){
            for(y in yAxis){
               let gridSpace = document.createElement('div')
               gridSpace.setAttribute('id',`${x}${y}`)
               container.appendChild(gridSpace)
            }
         }

4. Create functions for main gameplay: 
   1. init()
      - initialize classes/grid/starting ships
      - this is the time to place ships

   1. start() event handler
      - make sure ALL player ships have been placed && ALL computer ships have been randomly placed
      - starts game
      - player can now click grid space to fireMissile()
      - ICEBOX: create easy normal hard difficulties

   2. rotateShips()
      - rotate ships vertial or back to horizontal for ship placement

   3. dragShips()
      - allow for dragging of the ships for ship placement. Do I need a funcion for this? Or some other method?

   4. placePlayerShips()
      - checks to see if grid space is valid for ship placement
      - no other ships in grid space
      - ships do not go off grid
      - player board = true && computer board = false

   5. placeComputerShips()
      - randomly choose grid spaces to place computer ships
      - same logics as placePlayerShips()
      - computer board = true && player board = false

   6. firePlayerMissile()
      - call firePlayerMissileValid()
      - determine grid position for clicked grid space and call hitDetection()

   7. hitDetection()
      - check to see if missile hit a ship

   8. computerAi()
      - fireMissle() at random grid spaces
      - if positive return on hit, target grid spaces directly next to it...top bottom left right
      - do not target grid space previously attacked before

   9. firePlayerMissileValid()
      - check to see if player targeted a valid grid space
      - valid = not previously attacked && not own player's board

   10. ranNum()
      - need random number generator for computerAi() + etc

   11. updateGameBoard()
      - keeps ship hits and misses in memory for previous mentioned functions()

   12. runGame() 
      - check for continuation of game or gamerOver()

   13. continueGame()
      - called every ship hit

   14. gameOver()
      - stops all running functions
      - log somewhere the game winner -> Player/Computer
      - ICEBOX: change screen to one big "PLAYER/COMPUTER WINS!"















