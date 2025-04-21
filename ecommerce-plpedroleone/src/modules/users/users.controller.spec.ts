import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        getAllUsers: jest.fn(),
                        getUserById: jest.fn(),
                        updateUser: jest.fn(),
                        deleteUser: jest.fn(),
                    },
                },
            ],
        }).overrideGuard(AuthGuard)
        .useValue({})
        .overrideGuard(RolesGuard)
        .useValue({})
        .compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllUsers', () => {
        it ('should call getAllUsers from UsersService with correct parameters', async () => {
            const page = 1;
            const limit = 5;
            await controller.getAllUsers(page, limit);
            expect(service.getAllUsers).toHaveBeenCalledWith(page, limit);
        });

        it ('should cal getAllUsers with default parameters', async () => {
            await controller.getAllUsers(undefined, undefined);
            expect(service.getAllUsers).toHaveBeenCalledWith(1, 5);
        })
    })
})