const express = require("express");
const cors = require("cors");
const { Data } = require("./db");
const port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json({ msg: "successfully conneced to the server" });
});

app.get("/api/data/organizations", async (req, res) => {
  // const body = req.body;
  try {
    const data = await Data.find();

    console.log("data retrieved");
    return res.json({ data });
  } catch (error) {
    console.log("some error occured -> ", error);
    return res.status(500).json({ msg: "some error occured" });
  }
});

app.get("/api/data/organizationPaginated", async (req, res) => {
  const page = req.query.page;
  console.log(page);
  // const limit = req.body.limit;
  // const page = 1;
  const limit = 30;
  const start = (page - 1) * limit;
  try {
    const data = await Data.find().skip(start).limit(limit);

    console.log("data retrieved");
    return res.json({ data });
  } catch (error) {
    console.log("some error occured -> ", error);
    return res.status(500).json({ msg: "some error occured" });
  }
});

app.get("/api/data/organization/:uuid", async (req, res) => {
  const uuid = req.params["uuid"];
  console.log(uuid);
  // const body = req.body;
  try {
    const data = await Data.findOne({ uuid: uuid });

    console.log("data retrieved");
    return res.json(data);
  } catch (error) {
    console.log("some error occured -> ", error);
    return res.status(500).json({ msg: "some error occured" });
  }
});

app.get("/api/data/searchorganization", async (req, res) => {
  const filter = req.query.filter;
  console.log(filter);
  const page = req.query.page;
  console.log(page);
  const limit = 30;
  const start = (page - 1) * limit;

  try {
    const data = await Data.find({
      name: { $regex: `${filter}`, $options: "i" },
    })
      .skip(start)
      .limit(limit);

    console.log("data retrieved");
    return res.json(data);
  } catch (error) {
    console.log("some error occured -> ", error);
    return res.status(500).json({ msg: "some error occured" });
  }
});

app.get("/api/data/randomorg", async (req, res) => {
  const page = Math.floor(Math.random() * 1000);
  console.log(page);
  // const limit = req.body.limit;
  // const page = 1;
  const limit = 3;
  const start = (page - 1) * limit;
  try {
    const data = await Data.find().skip(start).limit(limit);

    console.log("data retrieved");
    return res.json({ data });
  } catch (error) {
    console.log("some error occured -> ", error);
    return res.status(500).json({ msg: "some error occured" });
  }
});

// app.get("/api/data/enter", async (req, res) => {
//   const body = {
//     data1: "Data1",
//     data2: "Data2",
//   }
//   try {
//     const data = await Data.create(body);
//     console.log(data);
//     return res.json({ data });
//   } catch (error) {
//     console.log("some error occured -> " ,error);
//     return res.status(500).json({msg: "some error occured"});
//   }
// })

app.post("/appointme", async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    // await Message.create(body);
    console.log("in appointment route");
  } catch (error) {
    console.log("failed to create message -> ", error);
    return res.status(500).json({ msg: "failed to create message" });
  }
  return res.status(200).json({ msg: "message sent successfully" });
});

app.listen(port);
