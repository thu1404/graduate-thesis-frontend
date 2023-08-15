import skillApi from '../api/skills';
import { ref } from '@nuxtjs/composition-api';

function useSkill() {
  const skills = ref([]);
  const isFetchingSkills = ref(true);

  const fetchSkills = async() => {
    isFetchingSkills.value = true;
    try {
      const response = await skillApi.getListSkills();
      skills.value = response.data.skills;
    } catch (error) {
      console.log(error);
    } finally {
      isFetchingSkills.value = false;
    }
  };

  return {
    skills,
    isFetchingSkills,
    fetchSkills,
  };
};

export default useSkill;
