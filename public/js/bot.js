export class Bot {
  constructor() {
    this.botMemory = {
      itemList: [],
    };
  }

  updateMemory(memoryType, data) {
    if (memoryType == "itemList") {
      this.botMemory.itemList.push(data);
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
    } else {
      thought = "I'm just a beta test now, but soon I'll talk to you";
    }

    return thought;
  }

  // Bot analyses what he has in memory and talks depending on that
  botTalk() {
    let botMessage = this.botThink();
    return botMessage;
  }
}
