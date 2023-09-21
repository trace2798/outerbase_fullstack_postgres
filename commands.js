// ////to create a pinecone index
// async function userCode() {
//     const response = await fetch('https://controller.us-west1-gcp-free.pinecone.io/databases', {
//       method: "POST",
//       headers: {
//         'Api-Key': 'fca4f85d-29c2-4144-bf07-ef071d1ec1d8',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         "name": {{request.body.name}},
//         "dimension": 1536,
//         "metric": "cosine"
//       })
//     });
//     return response.json();
//   }
