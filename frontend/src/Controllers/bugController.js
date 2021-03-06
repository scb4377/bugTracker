import axios from "axios";

// sending a request bug
const sendBug = async (data) => {
  const token = JSON.parse(localStorage.getItem('user'))
  const response = await axios.post("/bugs/sendRequest", data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })

  return response.data
}

// fetch bugs for app
const getBugs = async () => {
  const response = await axios.get("/bugs");

  return response.data;
};

// creating a bug
const addBug = async (data) => {
  const token = JSON.parse(localStorage.getItem('user'))
  const response = await axios.post("/bugs/createBug", data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};

// updating bug
const updateBug = async (data) => {
  const token = JSON.parse(localStorage.getItem('user'))

  const {foreign_id, priority, name, assigned, author, status, steps, details} = data;
  
  const response = await axios.put(
    `/bugs/updateBug/${foreign_id}`,
    {name, priority, assigned, author, status, steps, details},
    {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    }
  )

  return response.data
}

// delete bug
const deleteBug = async (data) => {
  const token = JSON.parse(localStorage.getItem('user'))

  const {_id} = data;
  
  const response = await axios.delete(
    `/bugs/${_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    }
  )

  return response.data
}

// leave a comment
const leaveComm = async (data) => {
  const token = JSON.parse(localStorage.getItem('user'))
  const { user, comment, id } = data;
  const response = await axios.put(
    `/bugs/leaveComment/${id}`,
    { user, comment },
    {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
    }
  );

  return response.data;
};

const bugController = {
  addBug,
  getBugs,
  leaveComm,
  updateBug,
  sendBug,
  deleteBug
};

export default bugController;

// export async function retrieveBugs() {
//     const getData = async () => {
//       const result = await axios.get('http://localhost:5000/bugs/')
//       return result.data
//     }
//     let data = await getData();
//     return data
// }

// export function retrieveBugs() {
//     let res = axios.get('http://localhost:5000/bugs/').then(data => data)
//     return res
// }

// export const retrieveBugs = async (dispatch) => {
//     let data = [];
//     try {
//         const response = await axios.get('http://localhost:5000/bugs').then(data => {return data});
//         let info = response.data
//         data.push(info)
//         return data
//         // return response.data
//         // dispatch(getBugs(response.data));
//     } catch (err) {
//         throw new Error(err)
//     }
// }

// export const retrieveBugs = () => {
//     let data = [];
//     try {
//         let response = axios.get('http://localhost:5000/bugs')
//         let info = response.data
//         data.push(info)
//         return data
//     } catch (error) {
//         console.log(error)
//     }
// }

// export function retrieveBugs() {
//     let data = [];

//     data.push(new bugModel({
//         _id: 1,
//         name: "Crash on Load",
//         details: "Crashes after 3 seconds",
//         status: "open",
//         steps: "Open application and it will crash",
//         assigned: "SB",
//         author: "John Doe",
//         priority: 1,
//         time: "23:38",
//         comments: ['hello'],
//     }))
//     data.push(new bugModel({
//         _id: 2,
//         name: "Wont Load",
//         details: "Crashes after 3 seconds",
//         status: "closed",
//         steps: "Open application and it will crash",
//         assigned: "SB",
//         author: "John Doe",
//         priority: 3,
//         time: "23:38",
//         comments: ['hello'],
//     }))

//     let sorted = data.sort((a, b) => {return a.priority - b.priority})

//     return sorted;
// }
