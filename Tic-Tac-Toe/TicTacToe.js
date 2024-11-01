window.addEventListener('DOMContentLoaded',()=>{

    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    //initializing as nil
    let board=['','','','','','','','',''];
    let currentPlayer = 'X';
    let isGameActive = true;

    //final results
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    //possible wins
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

    //check possible moves
    function handleResultValidation(){
        let roundWon=false;
        for(let i=0; i<=7; i++){
            const win=wins[i];
            const a=board[win[0]]; const b=board[win[1]]; const c=board[win[2]];
            if(a==='' || b==='' || c===''){
                continue;
            }
            if(a===b && b===c){
                roundWon=true;
                break;
            }
        }
        if(roundWon){
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }
        if(!board.includes(''))
            announce(TIE);
    }

    //Announcing the winners
    const announce = (type) => {
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> won!';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> won!';
                break;
            case TIE:
                announcer.innerText = 'It is a TIE!';
                break;
        };
        announcer.classList.remove('hide');
    };

    const isValidAction=(tile)=>{
        if(tile.innerText==='X' || tile.innerText==='O' ){
            return false;
        }
        return true;
    };

    //Board updation
    const updateBoard = (index) =>{
        board[index] = currentPlayer;
    }

    //change  X->O or vice versa
    const changePlayer=()=>{
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O':'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    //saving user clicks and updating the board, validation, player change
    const userAction = (tile, index) =>{
        if(isValidAction(tile) && isGameActive){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard=()=>{
        board=['','','','','','','','',''];
        isGameActive=true;
        announcer.classList.add('hide');

        if(currentPlayer==='O'){
            changePlayer();
        }
        tiles.forEach(tile =>{
            tile.innerText='';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }


    tiles.forEach((tile,index)=>{
        tile.addEventListener('click',()=> userAction(tile,index));
    });

    //onclick reset button
    resetButton.addEventListener('click',resetBoard);
});