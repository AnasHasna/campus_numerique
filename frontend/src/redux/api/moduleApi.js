import axios from "axios";

const getStatistiques = async (token) => {
  return await axios.get(
    "http://localhost:5000/modules/642c07cdc09d7b7544de87f0/statistiques",
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjg0NGUwMjFiYjZkYzA2ZTkyOGRkNyIsImlhdCI6MTY4MDYwNzA4MX0.l-ztYlD22TnJ9CdjLbXTK3eAQ8xm6od0uEdKiwiev_4`,
      },
      params: {
        moduleId: "642c07cdc09d7b7544de87f0",
      },
    }
  );
};

export { getStatistiques };
