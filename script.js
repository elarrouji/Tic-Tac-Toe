let game = (function () {
  
    //DOM Variables 
    
    let gameBoard = {
      winCombinations : [[0,1,2], [3,4,5], [6,7,8],
             [0,3,6], [1,4,7,], [2,5,8],
             [0,4,8], [2,4,6]],
      cacheDom : function() {
          this.board = document.querySelector("#board");
          this.cells = this.board.querySelectorAll(".cell");
          this.winMsgDiv = document.querySelector("#winning-message");
          this.winMsgText = this.winMsgDiv.querySelector("#winningText");
          this.restartButton = this.winMsgDiv.querySelector("button");
      },
      addSign : function(cell) {
        if(cell.classList.length == 1) {
          cell.classList.add(this.board.classList[1]);
        }
      },
      
      switchTurn : function() {
        if(board.classList[1] == "x") {
          board.classList.remove("x");
          board.classList.add("circle");
        } else {
          board.classList.remove("circle");
          board.classList.add("x");
        }
      },
      
      renderWinMsg : function(winner) {
        
        this.winMsgDiv.classList.add("show");
        
        this.winMsgText.innerText = `The winner is ${winner}`;
      },
      
      renderTieMsg : function() {
        this.winMsgDiv.classList.add("show");
        this.winMsgText.innerText = `It's a tie`;
      },
      
      checkWin : function() {
        let turn = this.board.classList[1];
        let turnSignCells = this.board.getElementsByClassName(turn);
        let turnSignCellsIndex = [];
        
        // Get the Index of each cell that contains the sign of the player in turn
      
        for(let i=0; i < turnSignCells.length; i++) {
          let index = Array.from(turnSignCells[i].parentNode.children).indexOf(turnSignCells[i]);
          turnSignCellsIndex.push(index);
        }
      
        /* Loop through the Wins array and check if a combination meets the sign        
        position*/
      
        if(turnSignCellsIndex.length >= 3) {
          for(let j=0; j < this.winCombinations.length; j++) {
            let result = this.winCombinations[j].every(c => turnSignCellsIndex.includes(c));
            if(result) {
              this.renderWinMsg(turn);
            }
          }
        }
      
        //Check if the game is a tie
      
        let check = 0;
        for(let g=0; g < this.cells.length; g++) {
          
          if(this.cells[g].classList.length == 2) {
            check++;
          }
        }
        if(check == 9) {this.renderTieMsg();}
      },
      
      restartGame : function() {
        this.winMsgDiv.classList.remove("show");
        for(let h=0; h < this.cells.length; h++) {
          if(this.cells[h].classList.length == 2) {
            this.cells[h].classList.remove(this.cells[h].classList[1]);
          }
        }
        this.board.classList.remove(this.board.classList[1]);
        this.board.classList.add('x');
      },
      
      bindEvents: function () {
        this.cells.forEach(c => c.addEventListener("click", (e) => {
      
          this.addSign(e.target);
          this.checkWin();
          this.switchTurn(); 
      
        }));
    
        this.restartButton.addEventListener("click", () => {
          this.restartGame();
        });
      }
      
    }
    gameBoard.cacheDom();
    gameBoard.bindEvents();
    
  })();
  