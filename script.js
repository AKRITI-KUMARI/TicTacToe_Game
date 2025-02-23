const eableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText="";
        messageContainer.classList.add("hide");
        if(box.classList.contains("red"))
            box.classList.remove("red");
        else if(box.classList.contains("blue"))
            box.classList.remove("blue");
        count = 0;
    }
}

const disableBoxes = () => {
    for(let box of boxes)
    {
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText=`Congratulations! Player '${winner}' is the winner`;
    messageContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText="No winner, it's a tie";
    messageContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => {
    for (let pattern of winPatterns) {
        position0val = boxes[pattern[0]].innerText;
        position1val = boxes[pattern[1]].innerText;
        position2val = boxes[pattern[2]].innerText;
        if(position0val != "" && position1val != "" && position2val != "")
        {
            if(position0val == position1val && position1val == position2val)
                showWinner(position0val);
        }
    }
}







let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let messageContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true; 
let count = 0;
let winPatterns = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turn0){
            box.classList.add("red");
            box.innerText="o";
            turn0 = false;
        }
        else{
            box.classList.add("blue");
            box.innerText="x";
            turn0 = true;
        }
        box.disabled = true;
        checkWinner();
        count++;
        if(count == 9)
            showDraw();
    });
});

newGameBtn.addEventListener("click", eableBoxes);
resetBtn.addEventListener("click", eableBoxes);