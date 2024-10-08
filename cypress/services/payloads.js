export const OrdersResponse = {
  data: {
    id: '',
    code: '',
    currency: '',
    package_id: '',
    quantity: '',
    type: '',
    description: null,
    esim_type: '',
    validity: 0,
    package: '',
    data: '',
    price: 0,
    created_at: '',
    manual_installation: '',
    qrcode_installation: '',
    installation_guides: {
      en: '',
    },
    text: null,
    voice: null,
    net_price: 0,
    brand_settings_name: null,
    sims: [
      {
        id: 0,
        created_at: '0',
        iccid: '0',
        lpa: '0',
        imsis: null,
        matching_id: '0',
        qrcode: '0',
        qrcode_url: '',
        airalo_code: null,
        apn_type: '',
        apn_value: '',
        is_roaming: true,
        confirmation_code: null,
        apn: {
          ios: {
            apn_type: '',
            apn_value: '',
          },
          android: {
            apn_type: '',
            apn_value: '',
          },
        },
        msisdn: null,
        direct_apple_installation_url: '',
      },
    ],
  },
  meta: {
    message: '',
  },
};

export const OrderListResponse = {
  "data": {
    "id": 0,
    "code": "",
    "package_id": "",
    "currency": "",
    "quantity": 0,
    "type": "",
    "description": "",
    "esim_type": "",
    "validity": 0,
    "package": "",
    "data": "",
    "price": 0,
    "text": null,
    "voice": null,
    "net_price": 0,
    "created_at": "",
    "manual_installation": "",
    "qrcode_installation": "",
    "installation_guides": {
      "en": ""
    }
  },
  "meta": {
    "message": ""
  },
};
