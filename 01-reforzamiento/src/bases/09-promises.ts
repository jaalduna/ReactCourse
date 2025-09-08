const myPromise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    //! yo quiero mi dinero!!
    // resolve(100);
    reject("Mi amigo se perdio");
  }, 2000);
});

myPromise
  .then((myMoney) => console.log(myMoney + " is back"))
  .catch((reason) => {
    console.warn(reason);
  })
  .finally(() => console.log("Continue with my life"));
