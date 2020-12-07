//Variable determining whether tha panels or animating or not.
var animating_panels = false;
//The last panel shown to the user.
var last_panel_shown;

//Set the duration for swapping and delay between swapping.
const swap_delay = 8000;
const swap_length = 1000;
//Get all of the card-stacks present on the page.
const card_stacks = document.querySelectorAll(".card-stack");

//The starting method.
function start() {
    //Reverse the card-stack so the first card will be shown, as usually elements stack incrementally according to their line position.
    card_stacks.forEach(card_stack => [...card_stack.children].reverse().forEach(card => card_stack.append(card)));
    //Swap the cards every 'swap_delay'.
    window.setInterval(swapCards, swap_delay);
}

//For each card-stack we want to swap a card, we'll delay this so each stack doesn't change at the same time.
function swapCards(){
    let index = 0;
    card_stacks.forEach(card_stack => {
        setTimeout(() => {
            swapCard(card_stack);
        }, index);
        index += swap_length/2.0;
    });
}

//Swap a card from the back of the stack to the front and play the animation for it.
function swapCard(card_stack) {
    //Get the last child.
    let end_card = card_stack.querySelector(".card:last-child");
    //Set the animation for that child to swap.
    end_card.style.animation = "swap "+ swap_length +"ms forwards";
    setTimeout(() => {
        //After the swap is complete stop the animation and prepend the card to the top of the stack.
        end_card.style.animation = "";
        card_stack.prepend(end_card);
    }, swap_length);
}

//When a project is clicked we want to show the project associated with the button.
function showProjectDescription(project) {
    //If a panel is currently animating we want to return and do nothing.
    if (animating_panels) return;
    animating_panels = true;
    let time = 0;
    //Get the id of the project according to the parameter passed in and then get its element.
    let id = project.id + "-description";
    let new_panel_shown = document.getElementById(id);
    //If a panel is currently shown or the panel is the same, we need to hide the currently shown panel.
    if (last_panel_shown != null || last_panel_shown == new_panel_shown){
        last_panel_shown.style.animation = "hide-pane 1s forwards";
        time = 1000;
        if (last_panel_shown == new_panel_shown) {
            last_panel_shown = null;
            animating_panels = false;
            return;
        }
    }
    //Now we want to show the new panel.
    setTimeout(() => {
        last_panel_shown = new_panel_shown;
        last_panel_shown.style.animation = "show-pane 1s forwards";
        animating_panels = false;
    }, time);
}

//Assign the DOM ready method.
document.addEventListener('DOMContentLoaded', start, false);