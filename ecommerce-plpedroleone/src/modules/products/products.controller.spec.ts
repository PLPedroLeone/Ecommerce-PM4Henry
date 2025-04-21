import { Test, TestingModule } from "@nestjs/testing";
import { AuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";

describe('ProductsController', () => {
    let controller: ProductsController;
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [
                {
                    provide: ProductsService,
                    useValue: {
                        addProducts: jest.fn(),
                        getAllProducts: jest.fn(),
                        getProductById: jest.fn(),
                        updateProduct: jest.fn(),
                        deleteProduct: jest.fn(),
                    },
                },
            ],
        }).overrideGuard(AuthGuard)
        .useValue({})
        .overrideGuard(RolesGuard)
        .useValue({})
        .compile();

        controller = module.get<ProductsController>(ProductsController);
        service = module.get<ProductsService>(ProductsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAllProducts', () => {
        it ('should call getAllProducts from ProductsService with correct parameters', async () => {
            const page = 1;
            const limit = 5;
            await controller.getAllProducts(page, limit);
            expect(service.getAllProducts).toHaveBeenCalledWith(page, limit);
        });
    })

    describe('getProductById', () => {
        it ('should call getProductById from ProductsService with correct id', async () => {
            const id = 'f456f-515f16-feevev5';
            await controller.getProductById(id);
            expect(service.getProductById).toHaveBeenCalledWith(id);
        })
    })
})