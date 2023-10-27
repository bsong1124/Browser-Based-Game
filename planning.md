# Browser-Based-Game

I would like to create a browser based battleship game
Here is the wireframe:

![image](https://github.com/bsong1124/Browser-Based-Game/assets/146983073/bcadae98-f451-4f45-8755-75def4d5c86d)



//Pseudocode below: **JavaScript**

Do I want to delete current screen and have a big "COMPUTER/PLAYER WINS!" as a game ending option?


1. Set up variables to link each element of the DOM. Maybe use boolean value to determine current attacker?
   AddEventListeners

2. Likely use a loop to iterate through an array nested in an object to link grid positions: variables for each grid element = tedious and bad code
  const object = {
    xAxis:[a b c etc]
    yAxis:[1 2 3 etc]
    }

3. Use a class system to create both computer's and player's ships: maybe use hitPoint for game ending condition?
   class Ships{
     .name
     .length
     .hitPoint
  }

4. Create functions for main gameplay: Should I use while loop to continue running game? Or nested functions like Tamagotchi...
   1. start()
      - make sure ALL player ships have been placed && ALL computer ships have been randomly placed
      - starts game
      - player can now click grid space to fireMissile()
      - Should I create easy normal hard difficulties?

   2. rotateShips()
      - rotate ships vertial or horizontal for ship placement

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

   6. clickGrid() || attackShip() || fireMissile()
      - determine grid position for clicked grid space and call hitDetection()

   7. Do I need hitDetection()? or just fireMissle()
      - if i need hitDetection() it would probably be inside fireMissle()
      - check to see if fireMissle() hit the computer ship
      - possibly use boolean value to determine hit or miss?

   8. computerAi()
      - fireMissle() at random grid spaces
      - if positive return on hit, target grid spaces directly next to it...top bottom left right
      - do not target grid space previously attacked before

   9. fireMissileValid()
      - check to see if player targeted a valid grid space
      - valid = not previously attacked && not player's board

   10. ranNum()
      - need random number generator for computerAi()...and maybe more?

   11. updateGameBoard()
      - keeps ship hits and misses in memory for previous mentioned functions()

   12. continueGame() might need?
      - if while loops is used for gameOver() condition, then don't need continueGame()
      - ie: 
            ```while (hitPoints of all computer/player ships >0){
              mainGameFunctions() -> currentAttacker = player/computer
              if(hitPoints of all player ships === 0 || hitPoints of all computer ships ===0){
                break
              }
        }```

   13. runGame() might need?
      - do I want function to create ships for player and computer and have it called on JS load?
      - OR do I want to manually use Class syntax to createthem myself...

   14. gameOver()
      - stops all running functions
      - Do I want to delete current screen and have a big "COMPUTER/PLAYER WINS!" as a game ending option?
      - log somewhere the game winner -> Player/Computer















