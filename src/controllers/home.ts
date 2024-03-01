import { IEventfilter, RShowEvents, RGetProfile, IShowEvents } from "../interfaces";
import { Events, Users } from "../models";

class HomeCtl {

    public async getProfile(user: Users): Promise<RGetProfile> {
        return user.userProfile()
    }


    public async showEvents(data: IShowEvents): Promise<RShowEvents> {
        const events = await Events.query().where(q => {
            if (!data) {
                return;
            }

            if (data.status) {
                q.where('status', data.status)
            }

            if (data.search) {
                q.where('name', 'like', `%${data.search}%`)
            }

            if (data.filter) {
                q.where('start_date', '>=', data.filter.startTime)
                q.where('end_date', '<=', data.filter.endTime)
            }
        })

        return {
            events: events.map(q => q.eventSchema())
        }
    }

    // mesto da pravam eventSchema() vo Events.ts bi mozelo vaka >
    // events:events.map(q=>{
    //     return {
    //         endTime: q.end_date,
    //         eventId: q.id,
    //         name: q.name,
    //         startTime: q.start_date,
    //         status: q.status
    //     }
    // })

}

const homeCtl = new HomeCtl();

export {
    homeCtl
}


