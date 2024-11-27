<template>
    <div>
        <div class="fixed top-5 right-5 bg-gray-200 border border-gray-400 w-[450px] h-[calc(100vh-50px)] overflow-x-hidden overflow-y-auto text-sm p-4 rounded">
            <pre>{{ r$ }}</pre>
        </div>

        <div class="fixed top-5 left-5 bg-gray-200 border border-gray-400 w-[330px] overflow-hidden text-sm p-4 rounded">
            <pre>
[ ] Backend validation, rule
    parsing
[x] Conditional rules
[ ] Dynamic, custom error messages
    with i18n, (minWeight example)
    from LiPO.
[ ] No frontend rule, only backend
    rule (does it work?)
[ ] Easy, custom rules with custom
    message
[ ] Get dirty fields
[ ] Collections (!)
[ ] Live, lazy validation
[ ] Resetting validation
[ ] Clear backend validation
[ ] Trigger validation for
    individual fields.
[ ] touch() and touched, also check
    for collections.
            </pre>
        </div>

        <h1 class="font-bold text-2xl">New Shipment</h1>

        <div class="bg-white shadow-lg rounded-lg p-5 mt-5">
            <h2 class="font-semibold">Shipment Data</h2>

            <!-- Shipment Reference Number -->
            <div class="mt-4 flex flex-col gap-2">
                <label class="font-medium uppercase text-xs text-gray-700">Shipment Reference Number</label>
                <input v-model="form.referenceNumber" type="text" class="w-1/2 ring-1 ring-gray-300 rounded outline-none p-2" />

                <FieldError :errors="r$.$errors.referenceNumber" />
            </div>

            <!-- Shipment Items -->
            <h3 class="font-semibold my-4">Shipment Items</h3>

            <div v-for="(_, index) in form.shipmentItems" class="border border-dashed border-gray-300 p-4 rounded-lg mt-4">
                <h3 class="font-semibold uppercase text-xs text-gray-700 mb-3">
                    Item {{ index + 1 }}
                </h3>

                <div class="grid grid-cols-2 gap-x-6 gap-y-4">
                    <div class="flex flex-col gap-2">
                        <label class="font-medium uppercase text-xs text-gray-700">Item Name</label>
                        <input v-model="form.shipmentItems[index].name" type="text" class="ring-1 ring-gray-300 rounded outline-none p-2" />
                        <FieldError :errors="r$.$errors.shipmentItems.$each[index].name" />
                    </div>
    
                    <div class="flex flex-col gap-2">
                        <label class="font-medium uppercase text-xs text-gray-700">Quantity</label>
                        <input v-model="form.shipmentItems[index].quantity" type="number" class="ring-1 ring-gray-300 rounded outline-none p-2" />
                        <FieldError :errors="r$.$errors.shipmentItems.$each[index].quantity" />
                    </div>
    
                    <div class="flex flex-col gap-2">
                        <label class="font-medium uppercase text-xs text-gray-700">Weight</label>
                        <input v-model="form.shipmentItems[index].weight" type="number" class="ring-1 ring-gray-300 rounded outline-none p-2" />
                        <FieldError :errors="r$.$errors.shipmentItems.$each[index].weight" />
                    </div>
                </div>
            </div>

            <!-- Action Buttons -->
            <button class="bg-blue-500 text-white px-10 py-3 rounded mt-6 hover:bg-blue-600 transition">
                Save
            </button>

            <button @click="someCondition = !someCondition" class="ml-2 bg-gray-500 text-white px-10 py-3 rounded mt-6 hover:bg-gray-600 transition">
                Toggle Condition: {{ someCondition ? 'ON' : 'OFF' }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRegle } from '@regle/core'
    import { required, minLength, minValue, applyIf } from '@regle/rules'

    const someCondition = ref(false)

    const form = ref({
        referenceNumber: '',
        shipmentItems: [
            { name: '', quantity: 0, weight: 0 },
            { name: '', quantity: 0, weight: 0 }
        ]
    })

    const { r$ } = useRegle(form, {
        referenceNumber: {
            required,
            minLength: applyIf(someCondition, minLength(5))
        },
        shipmentItems: {
            $each: {
                name: {
                    required,
                    minLength: applyIf(someCondition, minLength(3))
                },
                quantity: {
                    required,
                    minValue: minValue(1)
                },
                weight: {
                    required
                }
            }
        }
    })
</script>
