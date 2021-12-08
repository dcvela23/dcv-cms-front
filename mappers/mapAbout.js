const mapHero = (heroData) => {
  return {
    type: 'hero',
    data: {
      title: heroData.primary.hero_title[0].text,
      content: heroData.primary.about_hero_content.map((content) => {
        const { type, text } = content
        return {
          type,
          text
        }
      })
    }
  }
}

const mapAwards = (awardsData) => {
  return {
    type: 'awards',
    data: {
      title: awardsData.primary.awards_title[0].text,
      items: awardsData.items.map((content) => {
        const { award_title, award_quantity } = content
        return {
          title: award_title,
          quantity: award_quantity
        }
      })
    }
  }
}

const mapInteresets = (interestsData) => {
  return {
    type: 'interests',
    data: {
      title: interestsData.primary.interest_title[0].text,
      items: interestsData.items.map((content) => {
        const { interests_name, interest_image } = content
        console.log(content)
        return {
          name: interests_name,
          imageUrl: interest_image.url
        }
      })
    }
  }
}


module.exports = (aboutData) => {
  return aboutData.data.body.map((sliceData) => {
    switch (sliceData.slice_type) {
      case 'about_hero':
        return mapHero(sliceData)

      case 'about_awards':
        return mapAwards(sliceData)

      case 'interesets':
       return mapInteresets(sliceData)
    }
  })
}
