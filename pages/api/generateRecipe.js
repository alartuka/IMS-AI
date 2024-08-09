import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  baseURL: process.env.NEXT_PUBLIC_OPENROUTER_API_URL,
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ingredients } = req.body;

    try {
      const completion = await openai.chat.completions.create({
        model:"meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          { role: 'user', content: `You are a skilled chef and culinary expert with extensive knowledge of various cuisines and cooking techniques. You have a flair for creating innovative recipes that cater to diverse dietary preferences and restrictions. Your expertise lies in utilizing available ingredients to craft delicious meals that are easy to prepare and appealing to a wide range of tastes. Your task is to generate a list of recipes based on a specific inventory of ingredients. Here are the details of the inventory list items: ${ingredients}. Please ensure that the recipes are not only practical but also varied in terms of types of dishes, cooking methods, any dietary restrictions or preferences, such as vegetarian, gluten-free, halal, or low-carb options, as well as any specific cuisine styles or flavor profiles.` },
        ],
        max_tokens:1000,
      });
      console.log('API Response:', completion)
      res.status(200).json({ recipe: completion.choices[0].message.content });
    } catch (error) {
      console.error(`Error generating recipe: ${error.message}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }}












// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     try {
//       // const { inventoryItems } = await req.body;
//       // const recipeData = await generateRecipes(inventoryItems);
//       res.status(200).json({ recipes: recipeData });
//     } catch (error) {
//       res.status(500).json({ error: 'Error generating recipes' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

// const generateRecipes = async (inventoryItems) => {
//   // const apiUrl = 'https://api.openrouter.ai/v1/generate';
//   // const prompt = `You are a skilled chef and culinary expert with extensive knowledge of various cuisines and cooking techniques. You have a flair for creating innovative recipes that cater to diverse dietary preferences and restrictions. Your expertise lies in utilizing available ingredients to craft delicious meals that are easy to prepare and appealing to a wide range of tastes. Your task is to generate a list of recipes based on a specific inventory of ingredients. 
//   // Here are the details of the inventory list items: ${inventoryItems}. Please ensure that the recipes are not only practical but also varied in terms of types of dishes, cooking methods, any dietary restrictions or preferences, such as vegetarian, gluten-free, halal, or low-carb options, as well as any specific cuisine styles or flavor profiles.`

//   const response = await fetch(process.env.NEXT_PUBLIC_OPENROUTER_API_URL, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`
//     },
//     body: JSON.stringify({
//       model: 'llama-3.1-8b-instruct',
//       prompt: prompt,
//       max_tokens: 100,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error('Failed to generate recipes!');
//   }

//   const data = await response.json();
//   return data.choices[0].text.trim();
// };



// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//       const { inventoryItems } = req.body;
//       const ingredientsList = inventoryItems.map(item => item.name).join(', ');
//       const generatedRecipes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//           method: "POST",
//           headers: {
//             "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({
//             "model": "openai/gpt-3.5-turbo",
//             "messages": [
//               {"role": "user", 
//                 "content":  
//                 `You are a skilled chef and culinary expert with extensive knowledge of various cuisines and cooking techniques. You have a flair for creating innovative recipes that cater to diverse dietary preferences and restrictions. Your expertise lies in utilizing available ingredients to craft delicious meals that are easy to prepare and appealing to a wide range of tastes. Your task is to generate a list of recipes based on a specific inventory of ingredients. 
//                   Here are the details of the inventory list items: ${ingredientsList}. Please ensure that the recipes are not only practical but also varied in terms of types of dishes, cooking methods, any dietary restrictions or preferences, such as vegetarian, gluten-free, halal, or low-carb options, as well as any specific cuisine styles or flavor profiles.`,
//               },
//             ],
//           })
//       });
//       res.status(200).json(generatedRecipes);
//     } else {
//       res.setHeader('Allow', ['POST']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }

// const openrouterApi = new openrouter.Client({ apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY });
// const ingredientsList = inventoryItems.map(item => item.name).join(', ');
// const generatedRecipes = await openrouterApi.generate({
//   model: 'llama-3.1-8b-instruct',
//   prompt: `You are a skilled chef and culinary expert with extensive knowledge of various cuisines and cooking techniques. You have a flair for creating innovative recipes that cater to diverse dietary preferences and restrictions. Your expertise lies in utilizing available ingredients to craft delicious meals that are easy to prepare and appealing to a wide range of tastes. Your task is to generate a list of recipes based on a specific inventory of ingredients. 
//   Here are the details of the inventory list items: ${ingredientsList.join(', ')}. Please ensure that the recipes are not only practical but also varied in terms of types of dishes, cooking methods, any dietary restrictions or preferences, such as vegetarian, gluten-free, halal, or low-carb options, as well as any specific cuisine styles or flavor profiles.`,
// });


// import Groq from "groq-sdk";
// The Groq client
// const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

// const queryRecipes = async (inventoryItems) => {
//     const query = groq`*[_type == "recipe" && ingredients match "${inventoryItems.join(', ')}"]`;
//     const recipes = await fetch('YOUR_SANITY_API_ENDPOINT', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ query }),
//     }).then(res => res.json());
//     return recipes;
// };




// export async function POST(request) {
//   const { items } = await request.json();
//   console.log(items);

//   try {
//     const response = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content:  `You are a skilled chef and culinary expert with extensive knowledge of various cuisines and cooking techniques. 
//           You have a flair for creating innovative recipes that cater to diverse dietary preferences and restrictions. 
//           Your expertise lies in utilizing available ingredients to craft delicious meals that are easy to prepare and appealing to a wide range of tastes.
//           Your task is to generate a list of recipes based on a specific inventory of ingredients. Here are the details of the inventory list items: 
//           ${items.join(', ')}. 
//           Please ensure that the recipes are not only practical but also varied in terms of types of dishes,
//           cooking methods, any dietary restrictions or preferences, such as vegetarian, gluten-free, halal, or low-carb options,
//           as well as any specific cuisine styles or flavor profiles.`,
//         },
//       ],
//       model: 'llama3-8b-8192',
//     });

//     return new Response(JSON.stringify(response), {status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to fetch data from AI' }), {status: 500 });
//   }
// }