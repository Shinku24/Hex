const Agent = require('ai-agents').Agent;
var INFINITY = 100;
let board = []
//let globalBoard = [[]];

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
        // = board
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
       /* move = testDjk(board, this.id);*/
       //move = [4,3];
        //let me = getNeighbors([Math.floor (move / board.length), move % board.length], board);
        //alert([Math.floor (move / board.length), move % board.length])
        //console.log(board);
        /*let alphaBetaValue =alphaBetaMax(-INFINITY,INFINITY,6,board, this.id, []);
        console.log(alphaBetaValue);*/
        let nodes = alphaBetaMax(-INFINITY, INFINITY, 3, board, this.id, 0)
        console.log(nodes);
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
    for (let k = 0; k < size; k++) {
        for (let j = 0; j < size; j++) {
            if (board[k][j] === 0) {
                result.push([k,j]);//(k * size + j);
            }
        }
    }
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

    return result;
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
    if(matrixCopia[actualPos[0]][actualPos[1]]!=INFINITY){
        for(var i=0; i<areValidMov.length; i++){
            if(areValidMov[i]){
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

function getMatrixCostosDjk(board, matrix, player){
    let matrixCopia = JSON.parse(JSON.stringify(matrix));
    if(player==1){
        for(var i=0; i<board.length; i++){
            for(var j=0; j<board.length; j++){
                matrixCopia = setCostoDjk([i,j], player, matrixCopia, board);
            }
        }
    }else{
        for(var i=0; i<board.length; i++){
            for(var j=0; j<board.length; j++){
                matrixCopia = setCostoDjk([j,i], player, matrixCopia, board);
            }
        }
    }    
    return matrixCopia;
}

function testDjk(board, player){
    let size = board.length;
    let matrix = [];
    for(var i=0; i<size; i++) {
        matrix[i] = [];
        for(var j=0; j<size; j++) {
            matrix[i][j] = 0;
        }
    }
    if(player==1){        
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
    //-----------------------------------------------------------------------------------------------
    }else{ //PLAYER 2 
        for(var i=0; i<size; i++) {   
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
            }
        }        
    }
    let nMatrix = 0;
    nMatrix = getMatrixCostosDjk(board, matrix, player);
    for(var i=0; i<size;i++){
        nMatrix = getMatrixCostosDjk(board, nMatrix, player);
    }
    let path=0;
    if(player==1){
        path = findNextCheaperNeighbor (board, nMatrix, 1);
    }else{
        path = findNextCheaperNeighbor (board, nMatrix, 0);
    }
    let info = [path,nMatrix];
    return info;
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
    let stopIterating = true;
    let size = board.length;
    let position = [1,1];
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
    n=0
    while (stopIterating) {
        n=n+1
        console.log(`me quede atrapado en el while? ${n}`)
        console.log(`position: ${position}, board: ${board}`)
        let boolNeighbors = getValidNeighbors(position, board);
        let neighbors = getNeighbors(position, board);
        for (var i=0; i<neighbors.length; i++){
            if (boolNeighbors[i]) {
                if (position[player] == 0 || n > 50){
                    stopIterating = false;
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

class Node {
    constructor(pos, heuristic, player, depth, father){
        this.pos = pos;
        this.heuristic = heuristic;
        this.player = player;
        this.depth = depth;
        this.father = father;
    }
}

function alphaBetaMax(alpha, beta, depth, board ,player, n){
    console.log("\n Maximo: \n")

    info = testDjk(board, player);
    let path = info[0];
    let nMatrix = info[1];
    delete info
    let score = 0;
    if(depth==0){
        return nMatrix[path[0][0]][path[0][1]];
    }
    for (var i=0; i<path.length; i++){
        if(player==0){
            board[path[i][0]][path[i][1]] = 2;
            score = alphaBetaMin(alpha, beta, depth-1, board ,1, n+1);
        }else{
            board[path[i][0]][path[i][1]] = 1;
            score = alphaBetaMin(alpha, beta, depth-1, board ,0, n+1);
        }
        if(score>=beta){
            return beta;
        }
        if(score>alpha){
            alpha=score;
        }
    }
    return alpha;
}

function alphaBetaMin(alpha, beta, depth, board ,player, n){
    console.log("\n Minimo: \n")

    info = testDjk(board, player);
    let path = info[0];
    let nMatrix = info[1];
    delete info
    let score = 0;
    if(depth==0){
        return -1*nMatrix[path[0][0]][path[0][1]];
    }
    for (var i=0; i<path.length; i++){
        if(player==0){
            board[path[i][0]][path[i][1]] = 2;
            score = alphaBetaMax(alpha, beta, depth-1, board ,1, n+1);
        }else{
            board[path[i][0]][path[i][1]] = 1;
            score = alphaBetaMax(alpha, beta, depth-1, board ,0, n+1);
        }
        if (score<=alpha){
            return alpha;
        }
        if(score<beta){
            beta=score;
        }
    }
    return beta;
}