export interface ProjectVO {
    id: string,
    projectTitle: string
    projectDetail: string
}

export interface WorkExperienceVO {
    id: string,
    companyName: string
    position: string
    date: string
    project: ProjectVO[]
}

export interface WorkExperienceInputListRef {
    addWorkExperienceList: () => void
}
