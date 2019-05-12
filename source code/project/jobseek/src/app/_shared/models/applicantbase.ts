
export interface Education {
    higherDegreeValue: string;
    universityName: string;
    passingYearValue: string;
    percentageValue: string;
}

export interface Experience {
    designation: string;
    totalExperiences: string;
    description: string;

}


export interface Dashboard {
    active: Boolean;
}

export class ApplicantBase {
    firstName: string;
    lastName: string;
    dob: Date;
    gender: string;
    phone: number;
    email: string;
    password: string;
    state:string;
    city: string;
    address: string;
    country:string;
    skillValue: string[];
    dashboard: Dashboard;
    isApplicant: boolean;
    isHr: boolean;
    status: boolean;
    profile_photo: string;
    newEducation: Education;
    education: Education[];
    experience: Experience[];

    constructor(firstName: string, lastName: string, dob: Date, gender: string, phone: number, email: string, password: string, state: string, city: string, address: string, country: string, skillValue: string[], isA: boolean, dashB: Dashboard, isH: boolean, st: boolean, pp: string, education: Education[], experience: Experience[]) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dob;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.state = state;
        this.city = city;
        this.address = address;
        this.country = country;
        this.skillValue = skillValue;
        this.dashboard = dashB;
        this.isApplicant = isA;
        this.isHr = isH;
        this.status = st;
        this.profile_photo = pp;
        this.education = education;
        this.experience = experience;

    }

    public static createblank(): ApplicantBase {
        return new ApplicantBase(null, null, null, null, null, null, null, null, null,null, null, [], null, null, null, null,null,[{higherDegreeValue: '', universityName: '', passingYearValue: '', percentageValue: '' }],[]);
    }

}
