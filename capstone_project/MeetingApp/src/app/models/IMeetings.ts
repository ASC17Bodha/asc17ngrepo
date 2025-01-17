
export interface IMeeting  {
    id: number,
    title: string,
    date: string,
    startTime: string,
    endTime: string,
    description: string,
    attendees: string,
  };

  export interface IAttendees {
    id:number,
    name: string,
    email: string,
    password: string,
  }
  