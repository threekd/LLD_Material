# Flowchart for Procurement Process

## Inventory Management

```flow:vue

index=>operation: Index
material_info=>inputoutput: + Material info.
material_list=>operation: Material list
Batch_info=>inputoutput: + Batch info.
inventory_details=>operation: Inventory Details

index->material_info->material_list->Batch_info->inventory_details

index@>material_info({"stroke":"#9E9E9E"})@>material_list({"stroke":"#9E9E9E"})@>Batch_info({"stroke":"#9E9E9E"})@>inventory_details({"stroke":"#9E9E9E"})

```

## Procurement Process

```flow:vue

purchase_request=>operation: + Purchase Request
purchase_item=>inputoutput: Purchase Item
create_order=>operation: + Create Purchase Order
supplier_confirmation=>subroutine: Supplier Delivery
receipt_confirmation=>operation: Receipt Confirmation
stock_in=>operation: Stock In

purchase_request->purchase_item->create_order->supplier_confirmation->receipt_confirmation->stock_in

```