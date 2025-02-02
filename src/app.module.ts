import { Module } from '@nestjs/common';
import { PaymentsModule } from './shared/payments/payments.module';
import { NotificationsModule } from './shared/notifications/notifications.module';
import { UsersModule } from './shared/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get('NODE_ENV') === 'production';
        return {
          pinoHttp: {
            transport: isProduction
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                },
            prettyPrint: !isProduction,
            level: isProduction ? 'info' : 'debug',
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    PaymentsModule,
    NotificationsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
