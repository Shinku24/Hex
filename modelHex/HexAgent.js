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
        move = testDjk(board, this.id);
        //let me = getNeighbors([Math.floor (move / board.length), move % board.length], board);
        //alert([Math.floor (move / board.length), move % board.length])
        return move;
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
    //alert(st);
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
    //alert("holaa");
    return matrixCostos;
}


//----------------------------------------------------------------------------------------------------------------------
function getCostoDjk(actualPosVal, player){
    //alert(actualPosVal);
    if(actualPosVal== 0){
        return  3;
    }else if(actualPosVal==player){
        return 1;
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
                
                if(costo==3 || costo ==1){
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
            }
        }
        
        let nMatrix = 0;
        nMatrix = getMatrixCostosDjk(board, matrix, player);

        for(var i=0; i<size;i++){
            nMatrix = getMatrixCostosDjk(board, nMatrix, player);
        }        

        let path = findNextCheaperNeighbor (board, nMatrix, 1);
        let rand = Math.floor((Math.random() * path.length-1) + 1);
        while (path.length != 0){
            if (board [path[rand][0]][path[rand][1]] != 1){
                return path[rand]
            }else{
                delete path[rand]
            }
        }

    //-----------------------------------------------------------------------------------------------
    }else{ //PLAYER 2
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
            matrix[i] = [];
            for(var j=0; j<size; j++) {
                if(board[i][j]==player && i==0){
                    matrix[i][j] = 0;
                }
                else if(i==0){
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
        nMatrix = getMatrixCostosDjkVertical(board, matrix, player);

        for(var i=0; i<size;i++){
            nMatrix = getMatrixCostosDjkVertical(board, nMatrix, player);
        }

        let path = findNextCheaperNeighbor (board, nMatrix, 0);
        let rand = Math.floor((Math.random() * path.length-1) + 1);
        while (path.length != 0){
            if (board [path[rand][0]][path[rand][1]] != 2){
                return path[rand]
            }else{
                delete path[rand]
            }
        }
        
        let st = " ";
        for(var i=0; i<nMatrix.length;i++){
            for(var j=0; j<nMatrix.length;j++){
                st = st + nMatrix[i][j] + " ";
            }
            st = st + "\n";
        }
        //alert(st)

    }
    
    //return matrixCostos;
}


function include (array, value){
    let isEqual = false
    for (var i=0; i<array.length; i++){
        if(array[i].length!=value.length) {
            return isEqual; 
        }else{
            if(array[i][0]==value[0] && array[i][1]==value[1]) {
                isEqual = true; 
            }
        } 
    }
    return isEqual;
}

function findNextCheaperNeighbor (board, nMatrix, player){
    let shortestPath = [];
    let visitedNodes = [];
    let stopIterating = false;
    let size = board.length;
    let position = [];
    let menor = INFINITY;
    
    if(player == 1){
        for(var i=0; i<size;i++){
            if(nMatrix[i][size-1] == -INFINITY){
                continue
            } else if (nMatrix[i][size-1] <= menor && !include(visitedNodes, [i, size-1])){
                menor = nMatrix[i][size-1];
                shortestPath = [[i, size-1]];
                position = [i, size-1];
            }
        }
    }else {
        for(var i=0; i<size;i++){
            if(nMatrix[size-1][i] == -INFINITY){
                continue
            } else if (nMatrix[size-1][i] <= menor && !include(visitedNodes, [size-1, i])){
                menor = nMatrix[size-1][i];
                shortestPath = [[size-1, i]];
                position = [size-1, i];
            }
        }
    }

    visitedNodes.push(position);
    
    menor = INFINITY
    while (!stopIterating) {
        let boolNeighbors = getValidNeighbors(position, board);
        let neighbors = getNeighbors(position, board);

        //alert(position player: ${position}, menor : ${menor})

        for (var i=0; i<neighbors.length; i++){
            if (boolNeighbors[i]) {
                if (position[player] == 0){
                    stopIterating = true;
                }
                if (include(visitedNodes, neighbors[i])){
                    continue;   
                }
                if(nMatrix[neighbors[i][0]][neighbors[i][1]] == -INFINITY){
                    visitedNodes.push(neighbors[i]);
                    continue;
                } else if (nMatrix[neighbors[i][0]][neighbors[i][1]] > menor){
                    visitedNodes.push(neighbors[i]);
                    continue;
                }else if (nMatrix[neighbors[i][0]][neighbors[i][1]] <= menor && !include(visitedNodes, neighbors[i])) {
                    visitedNodes.push(neighbors[i]);
                    menor = nMatrix[neighbors[i][0]][neighbors[i][1]];
                    position = neighbors[i];
                } else {
                    visitedNodes.push(neighbors[i]);
                    menor = nMatrix[neighbors[i][0]][neighbors[i][1]];
                    position = neighbors[i]
                }
            }
        }
        
        shortestPath.push(position);

    }

    return shortestPath

}


function minimax (board, depth, player, initialNodes){

    let cola = initialNodes;
    let keepIterating = true;
    let alpha = 0;
    let betha = 0;
    n = 0
    while (keepIterating) {
        n = n+1
        if (n > depth){
            continue;
        }
        if (player) {
            //aqui va el maximizador
            let matrix1 = []
            for(var i=0; i<size; i++) {
                matrix1[i] = [];
                for(var j=0; j<size; j++) {
                    if(board[i][j] == player && j == 0){
                        matrix1[i][j] = 0;
                    } else if(j == 0){
                        matrix1[i][j] = 3;
                    } else if(board[i][j] == 0 || board[i][j] == player){
                        matrix1[i][j] = -INFINITY;
                    } else{
                        matrix1[i][j] = INFINITY;
                    }
                }
            }
            let matrix2 = [];
            for(var i=0; i<size; i++) {
                matrix2[i] = [];
                for(var j=0; j<size; j++) {
                    matrix2[i][j] = 0;
                }
            }
            for(var i=0; i<size; i++) {
                matrix2[i] = [];
                for(var j=0; j<size; j++) {
                    if(board[i][j]==player && i==0){
                        matrix2[i][j] = 0;
                    }
                    else if(i==0){
                        matrix2[i][j] = 3;
                    }else if(board[i][j]==0 || board[i][j]==player){
                        matrix2[i][j] = -INFINITY;
                    }else{
                        matrix2[i][j] = INFINITY;
                    }
                }
            }
            if(cola.length == 0){
                return false;
            }else{
                let nMatrixp1 = getMatrixCostosDjk(board, matrix1, 1);
                let nMatrixp2 = getMatrixCostosDjk(board, matrix2, 2);
                let path1 = findNextCheaperNeighbor(board, nMatrixp1, 1);
                let path2 = findNextCheaperNeighbor(board, nMatrixp2, 0);
                for(var i; i<path.length; i++){
                    if(include(cola, path[i])){
                        continue;
                    } else{
                        cola.push([path1[i], nMatrixp1[ path[0][0]][path[0][1]] - nMatrixp2[ path2[0][0]][path2[0][1]]], cola[0])
                    }
                }
            }
        } else {
            let path = findNextCheaperNeighbor(board, nMatrix, 0);
            //alert(Path: ${path}, player: ${player});
            //aqui va el minimizador
        }

        if (cola.length == 0){
            keepIterating = false
        }
    }
}