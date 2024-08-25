import { create } from "zustand";
import { persist } from "zustand/middleware";
import {ResumeSkillVO} from "@/components/input/common/resumeInputList/resumeInputList.interface";
import {WorkExperienceVO} from "@/components/input/content/workExperienceInputList/workExperienceInputList.interface";
import {EducateVO} from "@/components/input/content/educateInputList/educateInputList.interface";
import {IntroProps} from "@/components/input/intro/intro.interface";


interface SimpleResumeVO {
    name: string;
    setName: (name: string) => void;
    position: string;
    setPosition: (position: string) => void;

    introTitle: string;
    setIntroTitle: (title: string) => void;

    introText: string;
    setIntroText: (text: string) => void;

    educationTitle: string;
    setEducationTitle: (title: string) => void;
    education: EducateVO[];
    setEducation: (educateList: EducateVO[]) => void;
    experience: WorkExperienceVO[];
    setExperience: (experiences: WorkExperienceVO[]) => void;
    skillTitle: string;
    setSkillTitle: (title: string) => void;
    skills: ResumeSkillVO[];
    setSkills: (skills: ResumeSkillVO[]) => void;

    contectInfo: IntroProps;
    setContectInfo: (key: string, value: string) => void;
}

const useStore = create<SimpleResumeVO>()(
    persist(
        (set) => ({
            name: '',
            setName: (name) => set(() => ({ name })),

            position: '',
            setPosition: (position) => set(() => ({ position })),

            introTitle: '',
            setIntroTitle: (introTitle) => set(() => ({ introTitle })),

            introText: '',
            setIntroText: (introText) => set(() => ({ introText })),

            educationTitle: '',
            setEducationTitle: (educationTitle) => set(() => ({ educationTitle })),

            education: [],
            setEducation: (education) => set(() => ({ education })),

            experience: [],
            setExperience: (experience) => set(() => ({ experience })),

            skillTitle: '',
            setSkillTitle: (skillTitle) => set(() => ({ skillTitle })),

            skills: [],
            setSkills: (skills) => set(() => ({ skills })),

            contectInfo: { phone: '', web: '', email: '', github: '' },
            setContectInfo: (key, value) => set((state) => ({
                contectInfo: { ...state.contectInfo, [key]: value }
            })),
        }),
        { name: "simple-resume-storage" } // persist key
    )
);

export const store = useStore.getState();

export default useStore;