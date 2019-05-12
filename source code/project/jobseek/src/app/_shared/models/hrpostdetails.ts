
export class HrPostDetail {
  skillValue: any;
    _id: string;
    title: string;
    companyname: string;
    description: string;
    startdate: Date;
    enddate: Date;
    skills: string[];
    location: string;
    salary: number;
    experinece: string;
    applicants: any;
    dateOfJoining: Date;
    extraRequirement: string;
    noOfJobOpenings: number;
    CompanyUrl: string;
    bondDetails: any;
    ReportingVenue: any;
    ResourcePersonContact: any;
    selectionProcedure: string;

    constructor(id: string, title: string, companyname: string, description: string, startdate: Date, enddate: Date, skills: string[], location: string , salary: number, experinece: string, dateOfJoining: Date, extraRequirement: string, noOfJobOpenings: number, CompanyUrl: string, bondDetails: any, ReportingVenue: any, ResourcePersonContact: any, selectionProcedure: string, applicants: any) {
        this._id = id;
        this.title = title;
        this.companyname = companyname;
        this.description = description;
        this.startdate = startdate;
        this.enddate = enddate;
        this.skills = skills;
        this.location = location;
        this.salary = salary;
        this.experinece = experinece;
        this.dateOfJoining = dateOfJoining;
        this.extraRequirement = extraRequirement;
        this.noOfJobOpenings = noOfJobOpenings;
        this.CompanyUrl = CompanyUrl;
        this.bondDetails = bondDetails;
        this.ReportingVenue = ReportingVenue;
        this.ResourcePersonContact = ResourcePersonContact;
        this.selectionProcedure =  selectionProcedure;
        this.applicants = applicants;

    }

    public static createblank(): HrPostDetail {

        return new HrPostDetail(null , null, null,  null, null, null, [], null, null, null, null, null, null, null, null, null, null, null, []);
        }

}
