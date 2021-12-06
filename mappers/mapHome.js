module.exports = ({ homeData, skillsData } ) => {
  const {
    home_navigation,
    hero_title,
    hero_subtitle,
    hero_button,
    about_title,
    about_button,
    about_content,
    skills_title,
    skills_subtitle,
    skills_button,
    contact_title,
    contact_subtitle,
    contact_button
  } = homeData.data

  return {
    navigation: home_navigation.map((homeNavigationItem) => {
      const {
        navigation_id,
        navigation_item_text
      } = homeNavigationItem
      return {
        id: navigation_id,
        text: navigation_item_text
      }
    }),
    hero: {
      title: hero_title.map((titleRow) => {
        return {
          text: titleRow.text
        }
      }),
      subtitle: hero_subtitle,
      button: hero_button
    },
    about: {
      title: about_title[0].text,
      content: about_content.map((content) => {
        const { type, text } = content
        return {
          type,
          text
        }
      }),
      button: about_button,
    },
    skills: {
      title: skills_title[0].text,
      subtitle: skills_subtitle,
      list: skillsData.map((skill) => {
        const { skill_title } = skill.data

        return {
          text: skill_title[0].text
        }
      }),
      button: skills_button
    },
    contact: {
      title: contact_title[0].text,
      subtitle: contact_subtitle,
      button: contact_button
    }
  }
}
