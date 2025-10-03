import api from './axios.js'

async function test() {
  try {
    const res = await api.get("/"); // hit your backend root endpoint
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
}

test();