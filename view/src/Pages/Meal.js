import React from 'react'

export default function Meal() {
  
  return (
    <div className="p-8">
        <section>
        <h2 className="text-2xl font-bold mb-6 flex justify-between items-center">
          <span>Meal Prep</span>
          <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-400">
            Create a MealPrep
          </button>
        </h2>
        </section>
        <section>
            <div class="bg-gray-100 p-4">
    <h1 class="text-2xl font-bold mb-4">Weekly Meal Schedule</h1>
    <table class="w-full border-collapse border border-gray-200">
        <thead>
        <tr>
            <th class="border border-gray-200 p-2">Day</th>
            <th class="border border-gray-200 p-2">Breakfast</th>
            <th class="border border-gray-200 p-2">Lunch</th>
            <th class="border border-gray-200 p-2">Dinner</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td class="border border-gray-200 p-2">Monday</td>
            <td class="border border-gray-200 p-2">Omelette</td>
            <td class="border border-gray-200 p-2">Sandwich</td>
            <td class="border border-gray-200 p-2">Spaghetti</td>
        </tr>
        <tr>
            <td class="border border-gray-200 p-2">Tuesday</td>
            <td class="border border-gray-200 p-2">Pancakes</td>
            <td class="border border-gray-200 p-2">Salad</td>
            <td class="border border-gray-200 p-2">Roast Chicken</td>
        </tr>
        <tr>
            <td class="border border-gray-200 p-2">Wednesday</td>
            <td class="border border-gray-200 p-2">Cereal</td>
            <td class="border border-gray-200 p-2">Soup</td>
            <td class="border border-gray-200 p-2">Tacos</td>
        </tr>
        <tr>
            <td class="border border-gray-200 p-2">Thursday</td>
            <td class="border border-gray-200 p-2">French Toast</td>
            <td class="border border-gray-200 p-2">Burger</td>
            <td class="border border-gray-200 p-2">Salmon</td>
        </tr>
        <tr>
            <td class="border border-gray-200 p-2">Friday</td>
            <td class="border border-gray-200 p-2">Yogurt & Fruit</td>
            <td class="border border-gray-200 p-2">Wrap</td>
            <td class="border border-gray-200 p-2">Pizza</td>
        </tr>
        <tr>
            <td class="border border-gray-200 p-2">Saturday</td>
            <td class="border border-gray-200 p-2">English Muffin</td>
            <td class="border border-gray-200 p-2">Rice Bowl</td>
            <td class="border border-gray-200 p-2">Grilled Steak</td>
        </tr>
        <tr>
            <td class="border border-gray-200 p-2">Sunday</td>
            <td class="border border-gray-200 p-2">Bagel</td>
            <td class="border border-gray-200 p-2">Pasta Salad</td>
            <td class="border border-gray-200 p-2">Stir Fry</td>
        </tr>
        </tbody>
    </table>
            </div>
        </section>

    </div>
  )
}
