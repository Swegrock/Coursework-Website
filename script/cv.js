//Set the duration for swapping and delay between swapping.
let swapDelay = 9000;
let swapLength = 1000;
//Get all of the cardstacks present on the page.
let cardStacks = document.querySelectorAll(".cardstack");
let animatingPanels = false;
let lastPaneShown;

//Reverse the cardstack so the first card will be shown, as usually elements stack incrementally according to their line position.
cardStacks.forEach(cardStack => [...cardStack.children].reverse().forEach(card => cardStack.append(card)));
window.setInterval(swapCards, swapDelay);

//For each cardstack we want to swap a card, we'll delay this so each stack doesn't change at the same time.
function swapCards(){
    var index = 0;
    cardStacks.forEach(cardStack => {
        setTimeout(() => {
            swapCard(cardStack);
        }, index);
        index += swapLength/2.0;
    })
}

//Swap a card from the back of the stack to the front and play the animation for it.
function swapCard(cardStack) {
    //Get the last child.
    var endCard = cardStack.querySelector(".card:last-child");
    //Set the animation for that child to swap.
    endCard.style.animation = "swap "+ swapLength +"ms forwards";
    setTimeout(() => {
        //After the swap is complete stop the animation and prepend the card to the top of the stack.
        endCard.style.animation = "";
        cardStack.prepend(endCard);
    }, swapLength);
}

//When a project is clicked we want to show the project associated with the button.
function showProjectDescription(project) {
    //If a panel is currently animating we want to return and do nothing.
    if (animatingPanels) return;
    animatingPanels = true;
    var time = 0;
    //Get the id of the project according to the parameter passed in and then get its element.
    var id = "#" + project.id + "description";
    let newPaneShown = document.querySelector(id);
    //If a panel is currently shown or the panel is the same, we need to hide the currently shown panel.
    if (lastPaneShown != null || lastPaneShown == newPaneShown){
        lastPaneShown.style.animation = "hidepane 1s forwards";
        time = 1000;
        if (lastPaneShown == newPaneShown) {
            lastPaneShown = null;
            animatingPanels = false;
            return;
        }
    }
    //Now we want to show the new panel.
    setTimeout(() => {
        lastPaneShown = newPaneShown;
        lastPaneShown.style.animation = "showpane 1s forwards";
        animatingPanels = false;
    }, time);
}