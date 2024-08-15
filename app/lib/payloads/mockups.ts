import { HatData } from "../data/mockups";
import {
  MockupDocument,
  MockupRequestBody,
  MockupTypes,
} from "../types/mockups";

export function convertToMockupRequestBody(
  mockupDocument: MockupDocument,
  design_url: string,
): MockupRequestBody {
  return {
    design_url: design_url,
    base_sku: mockupDocument.base_sku,
    title: mockupDocument.title,
    colors: mockupDocument.colors,
    sizes: mockupDocument.sizes,
    type: mockupDocument.type as MockupTypes,
    cost: HatData[mockupDocument.type as MockupTypes].cost,
    dimension: {
      original_width: mockupDocument.dimension.original_width,
      original_height: mockupDocument.dimension.original_height,
      resized_height: mockupDocument.dimension.resized_height,
      resized_width: mockupDocument.dimension.resized_width,
      blank_width: 1200,
      blank_height: 1200,
    },
    position: {
      top: mockupDocument.position.top,
      left: mockupDocument.position.left,
    },
  };
}
