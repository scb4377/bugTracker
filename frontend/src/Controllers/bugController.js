import bugModel from '../Models/bugModel';
import axios from 'axios';
import { getBugs } from './Redux/bugSlice';

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
