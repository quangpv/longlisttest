export async function fetchPosts() {
  const data = await fetch("https://jsonplaceholder.typicode.com/posts").then(it => it.json());

  return duplicate(data, 30);
}

function duplicate(data, number) {
  const result = [];
  for (let count = 0; count < number; count++) {
    for (const item of data) {
      result.push(item);
    }
  }
  return result;
}
