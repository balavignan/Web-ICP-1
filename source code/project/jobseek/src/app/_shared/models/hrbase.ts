// tslint:disable-next-line:no-empty-interface
export interface Dashboard {
    active: Boolean;
}
export interface Experience {
    designationValue: string;
    jobDescriptionValue: string;
    experienceValue: string;
}

export class Hrbase {
    // id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dob: Date;
    phone: String;
    industry: string;
    address: string;
    country: string;
    city: string;
    state: string;
    gender: string;
    skillValue: string[];
    currDesignation: string;
    designation: string;
    jobProfile: string;
    experience: Experience[];
    profile_photo: string;
    dashboard: Dashboard;
    isHr: boolean;
    isApplicant: boolean;
    admin: boolean;
    status: boolean;

    constructor(f: string, l: string, em: string, p: string, pp: string,
        dob: Date, phone: string, industry: string, skillValue: string[], currDesignation: string, jobProfile: string, address: string, country: string, city: string, state: string, gender: string, experience: Experience[],
        dashB: Dashboard, ihr: boolean, iApl: boolean, ad: boolean, st: boolean, des: string) {
        this.firstName = f;
        this.lastName = l;
        this.email = em;
        this.dob = dob;
        this.phone = phone;
        this.industry = industry;
        this.address = address;
        this.country = country;
        this.city = city;
        this.state = state;
        this.gender = gender;
        this.skillValue = skillValue;
        this.currDesignation = currDesignation;
        this.jobProfile = jobProfile;
        this.experience = experience;
        this.password = p;
        this.profile_photo = pp;
        this.dashboard = dashB;
        this.isHr = ihr;
        this.isApplicant = iApl;
        this.admin = ad;
        this.status = st;
        this.designation = des;
    }

    public static createBlankUser(): Hrbase {
        return new Hrbase(null, null, null, null, null, null, null, null, [], null, null, null, null, null, null, null, [], null, false, false, false, false, null);
    }
}
