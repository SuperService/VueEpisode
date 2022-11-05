<script setup>
const selected = ref([]);
const checkAll = ref();
const cartStore = useCartStore();
const selectedItems = ref([]);
selectedItems.value = cartStore.items.filter((item) => item.item.selected === true);

async function handleCheckout() {
  const res = await $fetch("/api/cart", {
    method: "POST",
    body: {
      products: cartStore.items.map((item) => ({
        id: item.item.sys.id,
        quantity: item.amount
      }))      
    }
  });
  window.open(res.url, '_blank');
}

function removeSelectedItems() {
  for(const id of selected.value) {
    cartStore.removeItem(id);
  }
}

function checkAllChanged() {
    if (checkAll.value.checked) {
      selected.value = cartStore.items.map((u) => u.item.sys.id);
    } else {
      selected.value = []
    }
}

function checkItemChanged(i) {
  selected.value.length === cartStore.items.length ? checkAll.value.checked = true : checkAll.value.checked = false;
}

</script>
<template>
  <div class="m-10">
    <h1 class="text-3xl mb-5 font-bold">Your Cart</h1>
    <div class="md:flex w-full">
      <div class="md:w-3/4">
        <!-- Use this markup to display an empty cart -->
        <div v-if="!cartStore.items.length"  class="italic text-center pt-10">
          Cart is empty
        </div>
        <div v-else class="overflow-x-auto">
          <div class="table w-full">
            <table class="w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th>
                    <label>
                      <input type="checkbox" class="checkbox" ref="checkAll" @change="checkAllChanged()"/>
                    </label>
                  </th>
                  <th></th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Number of Items</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="({ item, amount }, i) in cartStore.items">
                  <th>
                    <label>
                      <input
                        v-model="selected"
                        type="checkbox"
                        class="checkbox"
                        @change="checkItemChanged"
                        :value="item.sys.id"
                      />
                    </label>
                  </th>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                          <img
                            :src="item.fields.image[0].fields.file.url"
                            :alt="item.fields.name"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div class="font-bold">
                      {{ item.fields.name }}
                    </div>
                    <ProductHeat :heat-level="item.fields.heatLevel" />
                  </td>
                  <td>
                    <ProductPrice :price="item.fields.price" />
                  </td>

                  <td>
                    <input
                      class="input input-bordered w-20"
                      type="number"
                      min="1"
                      v-model="cartStore.items[i].amount"
                    />
                  </td>
                  <th>
                    <NuxtLink
                      :to="{
                        name: 'products-id',
                        params: { id: `${item.sys.id}` },
                      }"
                    >
                      <button class="btn btn-ghost btn-xs">details</button>
                    </NuxtLink>
                  </th>
                </tr>
              </tbody>
            </table>
            <button 
              v-if="selected.length"
              class="text-sm text-red-500"
              @click="removeSelectedItems"
            >
              Remove Selected
            </button>
          </div>
        </div>
      </div>

      <div class="md:w-1/4 pl-5">
        <div class="card bg-slate-50">
          <div class="card-body">
            <ul>
              <li><strong>Subtotal</strong>: <ProductPrice :price="cartStore.subTotal" /></li>
              <li><strong>Estimated Taxes </strong>: <ProductPrice :price="cartStore.taxTotal" /></li>
              <li><strong>Total</strong>: <ProductPrice :price="cartStore.total" /></li>
            </ul>
            <div class="card-actions justify-end w-full">
              <button class="btn btn-primary w-full" @click="handleCheckout">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
