///////////// /* პირველი დავალება */

function mySetTimeout(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`თვლა ${delay} მილი წამი დასრულდა.`);
    }, delay);
  });
}

//////////////////* მეორე დავალება *////////////////////////////

function makeToys() {
  return new Promise((resolve, reject) => {
    mySetTimeout(3000).then(() => {
      if (Math.random() > 0.4) {
        resolve("Undefected");
      } else {
        reject("Defected");
      }
    });
  });
}

function sellToys(status) {
  return new Promise((resolve, reject) => {
    if (status === "Undefected") {
      mySetTimeout(1000).then(() => {
        if (Math.random() > 0.2) {
          resolve("Toy has been sold");
        } else {
          reject("Toy was unsuccessful");
        }
      });
    }
  });
}

function deliverToys(deliveryStatus) {
  return new Promise((resolve, reject) => {
    if (deliveryStatus === "Toy has been sold") {
      mySetTimeout(2000).then(() => {
        if (Math.random() > 0.1) {
          resolve("delivered");
        } else {
          reject("not delivered");
        }
      });
    }
  });
}

makeToys()
  .then((status) => sellToys(status))

  .then((deliveryStatus) => {
    return deliverToys(deliveryStatus);
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));

/* async/await ვერსია */ /////////////////////////////////////

async function make_toys() {
  await mySetTimeout(3000);
  if (Math.random() > 0.4) {
    return "Undefected";
  } else {
    throw new Error("Defected");
  }
}

async function sell_toys(status) {
  if (status === "Undefected") {
    await mySetTimeout(1000);
    if (Math.random() > 0.2) {
      return "Toy has been sold";
    } else {
      throw new Error("Toy was unsuccessful");
    }
  }
}

async function deliver_toys(deliveryStatus) {
  if (deliveryStatus === "Toy has been sold") {
    await mySetTimeout(2000);
    if (Math.random() > 0.1) {
      return "delivered";
    } else {
      throw new Error("not delivered");
    }
  }
}

async function process_toy() {
  try {
    const status = await make_toys();
    const saleStatus = await sell_toys(status);
    const deliveryStatus = await deliver_toys(saleStatus);
    console.log(deliveryStatus);
  } catch (err) {
    console.log(err);
  }
}

process_toy();
