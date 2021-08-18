# Anova Recipes API

These commands and notes have been extracted from the Anova Culinary app v2.1.0
APK after sniffing traffic from the app.

## API Endpoints

### `recipes.anovaculinary.com/v2/recipes/search.json?path=1&limit=20#ft=json`

#### API Calls

##### GET

Example response body (some strings and arrays truncated for brevity):

```json
{
  "feed": {
    "prev_page": "/v2/recipes/search.json?page=2&limit=20&q=&collection_id=&feed_type=general",
    "prev_page_params": {
      "url": "/v2/recipes/search.json",
      "limit": 20,
      "page": 2,
      "q": "",
      "collection_id": null
    },
    "next_page": "/v2/recipes/search.json?page=1&limit=20&q=&collection_id=&feed_type=general",
    "next_page_params": {
      "url": "/v2/recipes/search.json",
      "limit": 20,
      "page": 1,
      "q": "",
      "collection_id": null,
      "feed_type": "general"
    },
    "type": "general"
  },
  "user": null,
  "category": null,
  "data": [
    {
      "id": "668",
      "name": "Ribeye Steak ",
      "description": "Highly marbled cuts like...",
      "image_medium": "https://s3.amazonaws.com/anovarecipes/images/....jpg",
      "image_small": "https://s3.amazonaws.com/anovarecipes/images/recipes/....jpg",
      "rating": 5,
      "ratings_count": 11,
      "temp_c": 53.9,
      "temp_f": 129,
      "cooking_time": 60,
      "description_html": "<p><span class=\"s1\">Highly marbled cuts...</span></p><p class=\"p1\"></p>",
      "User": {
        "id": "709",
        "username": "J. Kenji Lopez-Alt",
        "first_name": "J. Kenji",
        "last_name": "López-Alt",
        "image": "https://s3.amazonaws.com/anovarecipes/images/users/kenji-portrait.jpg",
        "image_small": "https://s3.amazonaws.com/anovarecipes/images/users/kenji-portrait-resize-250x298-555a58e1657ba-s.jpg",
        "location": "San Francisco"
      }
    }
  ]
}
```

### `recipes.anovaculinary.com/v3/categories.json`

#### API Calls

##### GET

Example response body (yes, it returns an array, not an object):

```json
[
  {
    "id": "1",
    "title": "Beef",
    "image": "",
    "image_small": "",
    "image_medium": "",
    "subtitle": "",
    "description": ""
  },
  {
    "id": "2",
    "title": "Cocktails & Beverages",
    "image": "",
    "image_small": "",
    "image_medium": "",
    "subtitle": "",
    "description": ""
  }
]
```

### `recipes.anovaculinary.com/v3/recipes/details/${recipeId}.json`

#### API Calls

##### GET

Example response body (some strings and arrays truncated for brevity):

```json
{
  "Recipe": {
    "id": "215",
    "user_id": "52",
    "slug": "sous-vide-sirloin-steaks-with-mushroom-cream-sauce",
    "name": "Sous Vide Sirloin Steaks with Mushroom Cream Sauce",
    "time": null,
    "finishingStep": "About 5 minutes before steaks are done...",
    "serving_size": null,
    "description": "True comfort food, and so easy to make...",
    "notes": null,
    "ingredients": "2  6-ounce sirloin steaks\nSalt and pepper to...",
    "directions": "Heat water to 57\u00baC using Anova Precision...",
    "image": "https:\/\/s3.amazonaws.com\/anovarecipes\/images\/recipes\/....jpg",
    "image_small": "https:\/\/s3.amazonaws.com\/anovarecipes\/images\/recipes\/....jpg",
    "image_medium": "https:\/\/s3.amazonaws.com\/anovarecipes\/images\/recipes\/....jpg",
    "image_centered": "https:\/\/s3.amazonaws.com\/anovarecipes\/....jpg",
    "image_og": null,
    "comment_count": "0",
    "created": "2014-11-20 16:13:56",
    "servings": "2",
    "public": "1",
    "category_id": "1",
    "rating": 5,
    "ratings_count": "3",
    "featured": "0",
    "prepHours": "0",
    "prepMinutes": "20",
    "video_url": null,
    "temperatureFull": "134.6 F \/ 57 C",
    "temperatureFahrenheit": 134.6,
    "temperatureCelsius": 57,
    "categoryName": "Beef",
    "categorySlug": "beef",
    "votersCount": 3,
    "video_url_embed": false,
    "isRated": true,
    "userRating": 0,
    "temp_c": 57,
    "temp_f": 134.6,
    "cooking_time": 45,
    "description_html": "True comfort food, and so easy to make..."
  },
  "Category": {
    "id": "1",
    "title": "Beef",
    "has_variations": false,
    "parent_id": null,
    "lft": "1",
    "rght": "22",
    "image": "",
    "image_small": "",
    "image_medium": "",
    "subtitle": "",
    "description": ""
  },
  "User": {
    "id": "52",
    "first_name": "Barbara",
    "last_name": "Freda",
    "image": "https:\/\/graph.facebook.com\/788324877\/picture?type=large",
    "image_small": "https:\/\/graph.facebook.com\/788324877\/picture?type=small",
    "info": "I grew up in a cooking family and after getting a degree...",
    "location": "Charlotte NC"
  },
  "Ingredient": [{
    "text": "2 (6-ounce) boneless sirloin steaks",
    "image": null,
    "image_small": null,
    "image_medium": null
  }, {
    "text": "Salt and freshly ground black pepper",
    "image": null,
    "image_small": null,
    "image_medium": null
  }],
  "Direction": [{
    "text": "Set the Anova Sous Vide Precision Cooker to 134\u00baF (57\u00baC).",
    "image": null,
    "image_small": null,
    "image_medium": null
  }],
  "FinishingStep": [{
    "finishing_step_title_id": "184",
    "text": "When the timer goes off, remove the...",
    "image": null,
    "image_small": null,
    "image_medium": null
  }],
  "VariationSetup": [],
  "FinishingSteps": [{
    "title": "Finishing Steps",
    "steps": [{
      "id": "1309",
      "recipe_id": "215",
      "finishing_step_title_id": "184",
      "text": "When the timer goes off, remove the...",
      "image": null,
      "image_small": null,
      "image_medium": null,
      "created": null
    }]
  }]
}
```
