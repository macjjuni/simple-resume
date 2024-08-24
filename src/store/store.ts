import { create } from "zustand";
import { persist } from "zustand/middleware";
import {ResumeSkillVO} from "@/components/input/common/resumeInputList/resumeInputList.interface";


interface SimpleResumeVO {
    skillTitle: string;
    setSkillTitle: (title: string) => void;
    skills: ResumeSkillVO[];
    setSkills: (skills: ResumeSkillVO[]) => void;
}

const useStore = create<SimpleResumeVO>()(
    persist(
        (set) => ({
            skillTitle: '',
            setSkillTitle: (skillTitle) => set(() => ({ skillTitle })),
            skills: [],
            setSkills: (skills) => set(() => ({ skills }))
        }),
        { name: "simple-resume-storage" } // persist key
    )
);

export const store = useStore.getState();

export default useStore;