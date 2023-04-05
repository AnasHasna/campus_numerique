import axios from "axios";

const getStatistiques = async (token) => {
  return await axios.get(
    "http://localhost:5000/modules/642c30efba6c7fb80f3c036f/statistiques",
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Mjg0NGUwMjFiYjZkYzA2ZTkyOGRkNyIsImlhdCI6MTY4MDYwNzA4MX0.l-ztYlD22TnJ9CdjLbXTK3eAQ8xm6od0uEdKiwiev_4`,
      },
    }
  );
};

export { getStatistiques };
