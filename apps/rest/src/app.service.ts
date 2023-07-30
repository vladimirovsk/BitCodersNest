import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
import mongoose from 'mongoose';

export const APPLICANT_STATUSES = ['applied', 'confirmed', 'declined', 'calledOut', 'cancelled', 'suspended', 'open'] as const; //open is necessary for shift filter in FM web
export type TApplicantStatus = typeof APPLICANT_STATUSES[number];
export interface IApplicant {
  user: mongoose.Schema.Types.ObjectId | string;
  isInOvertime?: boolean;
  isReturning?: boolean;
  status: TApplicantStatus,
  updatedAt?: Date,
  updatedBy?: mongoose.Schema.Types.ObjectId | string;
  confirmedAt?: Date,
  appliedAt?: Date,
  confirmedBy?: mongoose.Schema.Types.ObjectId | string;
  oncallShiftId?: string;
  facilityDeactivated?: boolean; //TODO: set everywhere where status is updated automatically
}

@Injectable()
export class AppService implements OnModuleInit {
  private logger = new Logger(AppService.name);
  constructor(
    private readonly configService: ConfigService
  ) {}
  onModuleInit() {
    // test async function
    // const timeArr = [4000, 8000, 1000, 3000];
    // this.logger.log('REST SERVICE STARTING');
    //
    // timeArr.forEach(time =>{
    //   console.log(`START FUNCTION ${time}`)
    //   let promise = new Promise(function(resolve, reject) {
    //     setTimeout(() => resolve("done"),  time);
    //   }).then((data)=>{
    //     console.log(`data ${time}`);
    //   })
    // })
    // console.log('END FUNCTION');

  }
}
