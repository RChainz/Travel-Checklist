export class Bot {
  constructor() {
    this.botMemory = {
      itemList: [],
      lastEvents: [],
      lastReaction: null,
    };
  }

  updateMemory(memoryType, data) {
    if (memoryType == "item") {
      this.botMemory.itemList.push(data);
    } else if (memoryType == "event") {
      this.botMemory.lastEvents.push(data);
      if (this.botMemory.lastEvents.length > 5)
        this.botMemory.lastEvents.shift();
    }
  }

  botThink() {
    let numItems = this.botMemory.itemList.length;
    let thought = "";

    if (numItems == 1) {
      thought =
        Math.random() < 0.5
          ? "Wow, that ought to be a big trip your making, one item only?"
          : "You're travelling to your livin room?";
    } else if (numItems > 2 && numItems < 10) {
      thought =
        Math.random() < 0.5
          ? "You sure you're not forgetting anything?"
          : `You sure ${numItems} items are enough for you trip???`;
    } else if (numItems > 10) {
      thought =
        Math.random() < 0.5
          ? "Ok, now you're just moving countries"
          : "Ahhh, you're gonna get the plane all to yourself... got it";
    }

    return thought;
  }

  // Bot analyses what he has in memory and talks depending on that
  botTalk() {
    let botMessage = this.botThink();
    return botMessage;
  }
}
