const messageBox = document.querySelector(".messageDisplay");

async function loadData() {
    const req = await fetch("songs.json");
    let data;

    try {
        data = await req.json();
    } catch (error) {
        console.warn(error);
    }

    if (data.length === 0) {
        messageBox.setMessage("Oops! There were no songs found!", "warning");
        return;
    }

    console.log(data);
}

loadData();