const Agent = require('ai-agents').Agent;
var INFINITY = 100;

class HexAgent extends Agent {
    constructor(value) {
        super(value);
    }
    
    /**
     * return a new move. The move is an array of two integers, representing the
     * row and column number of the hex to play. If the given movement is not valid,
     * the Hex controller will perform a random valid movement for the player
     * Example: [1, 1]
     */
    send() {
        let board = this.perception;
        let size = board.length;
        let available = getEmptyHex(board);
        let nTurn = size * size - available.length;
        //matrix
        if (nTurn == 0) { // First move
            return [Math.floor(size / 2), Math.floor(size / 2) - 1];
        } else if (nTurn == 1){
            return [Math.floor(size / 2), Math.floor(size / 2)];
        }

        let move = available[Math.round(Math.random() * ( available.length -1 ))];        
        //let matrixCostos = test(board,this.id);
        //alert("HOAL");
        testDjk(board,this.id);
        //let me = getNeighbors([Math.floor (move / board.length), move % board.length], board);
        //alert([Math.floor (move / board.length), move % board.length])
        return [Math.floor (move / board.length), move % board.length];
    }

}

module.exports = HexAgent;

/**
 * Return an array containing the id of the empty hex in the board
 * id = row * size + col;
 * @param {Matrix} board 
 */
function getEmptyHex(board) {
    let result = [];
    let size = board.length;
    let st = "";
    for (let k = 0; k < size; k++) {
        for (let j = 0; j < size; j++) {
            st = st + board[k][j];
            if (board[k][j] === 0) {
                result.push(k * size + j);
            }
        }
        st = st + "\n";
    }
    //alert(st);
    return result;
}

function isValid(newposition, board, size){
    let x = newposition[0];
    let y = newposition[1];
    if(x<0 || x>=size || y<0 || y>=size){
        return false;
    }else if(board[x][y]==1 || board[x][y]==2){
        return true;
    }
    return true;
}

function getNeighbors(position, board){    
    let size = board.length;
    let result = [];

    /*
    **  / \/ \
    **  |A||B|
    **  \_/\_/
    ** / \/ \/ \
    ** |C|| ||D|
    ** \_/\_/\_/
    **  / \/ \
    **  |E||F|
    **  \_/\_/
    */
    let AIsValid = isValid([position[0]-1,position[1]+0], board, size);
    let BIsValid = isValid([position[0]-1,position[1]+1], board, size);

    let CIsValid = isValid([position[0]+0,position[1]-1], board, size);
    let DIsValid = isValid([position[0]+0,position[1]+1], board, size);

    let EIsValid = isValid([position[0]+1,position[1]-1], board, size);
    let FIsValid = isValid([position[0]+1,position[1]+0], board, size);

    if(AIsValid){ result.push([position[0]-1,position[1]+0]); }
    else{ result.push([false,false]); }
    if(BIsValid){ result.push([position[0]-1,position[1]+1]); }
    else{ result.push([false,false]); }

    if(CIsValid){ result.push([position[0]+0,position[1]-1]); }
    else{ result.push([false,false]); }
    if(DIsValid){ result.push([position[0]+0,position[1]+1]); }
    else{ result.push([false,false]); }

    if(EIsValid){ result.push([position[0]+1,position[1]-1]); }
    else{ result.push([false,false]); }
    if(FIsValid){ result.push([position[0]+1,position[1]+0]); }
    else{ result.push([false,false]); }

    //alert(result);
    return result;
}

function getValidNeighbors(position, board){    
    let size = board.length;
    let result = [];

    /*
    **  / \/ \
    **  |A||B|
    **  \_/\_/
    ** / \/ \/ \
    ** |C|| ||D|
    ** \_/\_/\_/
    **  / \/ \
    **  |E||F|
    **  \_/\_/
    */
    let AIsValid = isValid([position[0]-1,position[1]+0], board, size);
    let BIsValid = isValid([position[0]-1,position[1]+1], board, size);

    let CIsValid = isValid([position[0]+0,position[1]-1], board, size);
    let DIsValid = isValid([position[0]+0,position[1]+1], board, size);

    let EIsValid = isValid([position[0]+1,position[1]-1], board, size);
    let FIsValid = isValid([position[0]+1,position[1]+0], board, size);

    if(AIsValid){ result.push(true); }
    else{ result.push(false); }
    if(BIsValid){ result.push(true); }
    else{ result.push(false); }

    if(CIsValid){ result.push(true); }
    else{ result.push(false); }
    if(DIsValid){ result.push(true); }
    else{ result.push(false); }

    if(EIsValid){ result.push(true); }
    else{ result.push(false); }
    if(FIsValid){ result.push(true); }
    else{ result.push(false); }

    //alert(result);
    return result;
}


function getCosto(actualPos, newPos, player){
    if(actualPos==0){
        return  3;
    }else if(actualPos==player){
        return 0;
    }else{
        return Infinity;
    }
}

function getMatrixCostos(board, matrix, player){
    let st = " ";
    for(var i=0; i<board.length; i++){
        for(var j=0; j<board.length; j++){
            matrix[i][j] = getCosto(board[i][j], board[i][j], player);
            st = st + matrix[i][j] + " ";
        }
        st = st + "\n";
    }
    alert(st);
    return matrix;
}

function test(board, player){
    let size = board.length;
    let matrix = [];    
    for(var i=0; i<size; i++) {
        matrix[i] = [];
        for(var j=0; j<size; j++) {
            matrix[i][j] = INFINITY;
        }
    }
    
    let matrixCostos = getMatrixCostos(board, matrix, player);
    alert("holaa");
    return matrixCostos;
}


//----------------------------------------------------------------------------------------------------------------------
function getCostoDjk(actualPosVal, player){
    //alert(actualPosVal);
    if(actualPosVal== 0){
        return  3;
    }else if(actualPosVal==player){
        return 0;
    }else{
        return INFINITY;
    }
}


function setCostoDjk(actualPos, player, matrix, board){    
    let areValidMov = getValidNeighbors(actualPos,board);
    let validMov = getNeighbors(actualPos,board);
    let matrixCopia = JSON.parse(JSON.stringify(matrix));
    //alert(matrixCopia);
    //alert(board);
    //alert(player);
    if(matrixCopia[actualPos[0]][actualPos[1]]!=INFINITY){
        for(var i=0; i<areValidMov.length; i++){
            if(areValidMov[i]){
                //alert(validMov[i]);
                let costo = getCostoDjk(board[validMov[i][0]][validMov[i][1]], player);
                
                if(costo==3 || costo ==0){
                    let costoAcumulado = 0;
                    if(matrixCopia[actualPos[0]][actualPos[1]]==-INFINITY){
                        continue
                    }else{
                        costoAcumulado = matrixCopia[actualPos[0]][actualPos[1]]+costo; //EL costo actual + el costo de ir a la otra posicion
                    }
    
                    if(matrixCopia[validMov[i][0]][validMov[i][1]] == -INFINITY){
                        matrixCopia[validMov[i][0]][validMov[i][1]] = costoAcumulado;
    
                    }else if(matrixCopia[validMov[i][0]][validMov[i][1]] == INFINITY){
                        continue
                    }else if(costoAcumulado<matrixCopia[validMov[i][0]][validMov[i][1]]){
                        matrixCopia[validMov[i][0]][validMov[i][1]] = costoAcumulado;
                    }
                }else{
                   matrixCopia[validMov[i][0]][validMov[i][1]] = costo;
                }
            }        
        }
    }
    
    return matrixCopia;
}

function getMatrixCostosDjkVertical(board, matrix, player){
    let matrixCopia = JSON.parse(JSON.stringify(matrix));
    for(var i=0; i<board.length; i++){
        for(var j=0; j<board.length; j++){
            matrixCopia = setCostoDjk([j,i], player, matrixCopia, board);
        }
    }
    return matrixCopia;
}


function getMatrixCostosDjk(board, matrix, player){
    let matrixCopia = JSON.parse(JSON.stringify(matrix));
    for(var i=0; i<board.length; i++){
        for(var j=0; j<board.length; j++){
            matrixCopia = setCostoDjk([i,j], player, matrixCopia, board);
        }
    }
    return matrixCopia;
}

function testDjk(board, player){
    if(player==1){
        let size = board.length;
        let matrix = [];
        let sts = " ";
        for(var i=0; i<size; i++) {
            matrix[i] = [];
            for(var j=0; j<size; j++) {
                if(board[i][j]==player && j==0){
                    matrix[i][j] = 0;
                }
                else if(j==0){
                    matrix[i][j] = 3;
                }else if(board[i][j]==0 || board[i][j]==player){
                    matrix[i][j] = -INFINITY;
                }else{
                    matrix[i][j] = INFINITY;
                }
                sts = sts + matrix[i][j]+ " ";
            }
            sts = sts + "\n";
        }
        //alert(sts);
        
        let nMatrix = 0;
        nMatrix = getMatrixCostosDjk(board, matrix, player);

        for(var i=0; i<size;i++){
            nMatrix = getMatrixCostosDjk(board, nMatrix, player);
        }

        let st = " ";
        for(var i=0; i<nMatrix.length;i++){
            for(var j=0; j<nMatrix.length;j++){
                st = st + nMatrix[i][j] + " ";
            }
            st = st + "\n";
        }
        alert(st)
    }else{
        let size = board.length;
        let matrix = [];
        let sts = " ";

        for(var i=0; i<size; i++) {
            matrix[i] = [];
            for(var j=0; j<size; j++) {
                matrix[i][j] = 0;
            }
        }

        for(var i=0; i<size; i++) {            
            for(var j=0; j<size; j++) {
                if(board[i][j]==player && j==0){
                    matrix[i][j] = 0;
                }
                else if(j==0){
                    matrix[j][i] = 3;
                }else if(board[j][i]==0 || board[j][i]==player){
                    matrix[j][i] = -INFINITY;
                }else{
                    matrix[j][i] = INFINITY;
                }
                sts = sts + matrix[i][j]+ " ";
            }
            sts = sts + "\n";
        }
        //alert(sts);
        
        let nMatrix = 0;
        nMatrix = getMatrixCostosDjkVertical(board, matrix, player);

        for(var i=0; i<size;i++){
            nMatrix = getMatrixCostosDjkVertical(board, nMatrix, player);
        }

        let st = " ";
        for(var i=0; i<nMatrix.length;i++){
            for(var j=0; j<nMatrix.length;j++){
                st = st + nMatrix[i][j] + " ";
            }
            st = st + "\n";
        }
        alert(st)

    }
    
    //return matrixCostos;
}