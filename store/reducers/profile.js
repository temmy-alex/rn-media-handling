import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'
import { createTrans, getProfile, getTransactions, updateProfile, uploadImage } from '../../configs/lib/profile/rest';

export const initial = createAsyncThunk(('profile'), async () => {
    try {
        const res = await getProfile();

        return res.data;
    } catch (error) {
        return error
    }
});

export const getTransaction = createAsyncThunk(('profile/transaction'), async () => {
    try {
        const res = await getTransactions();

        return res.data;
    } catch (error) {
        console.log(error);
        return error
    }
});

export const createTransaction = createAsyncThunk(('profile/transaction/create'), async (data) => {
    try {
        const res = await createTrans(data);

        return res.data;
    } catch (error) {
        return error
    }
});

export const uploadEditProfile = createAsyncThunk(('profile/edit'), async (data) => {
    try {
        let profile = data.image;
        if(data.image?.value){
            const mimeType = data.image.value.split('ImagePicker/')[1].split('.')[1];
            // Tipe gambar dari Rn berbentuk image saja 
            // Ini digunakan untuk mencai mimetype nya digambar
            const image = new FormData();

            image.append('profile', {
                uri : data.image.value,
                // image.type = image
                // Bentuk format yang diterima oleh server harus dalam bentuk image/mimetype
                type: `${data.image.type}/${mimeType}`,
                name: `profile-${data.name}.${mimeType}`,
            });
    
            const res = await uploadImage(image);

            profile = res?.data.path
        }

        const res = await updateProfile({
            profile: profile,
            name: data.name,
            phone: data.phone,
        });

        return res.data;
    } catch (error) {
        return error
    }
});

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        name: "",
        email: "",
        balance: "",
        phone: "",
        profile: null,
        loading: false,
        transactions: [],
        transactionFinish: false,
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(initial.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(initial.fulfilled, (state, action) => {
            state.loading = false;
            state.phone = action.payload.phone;
            state.name = action.payload.information.name;
            state.email = action.payload.email;
            state.profile = action.payload.information?.profile ? `${process.env.EXPO_PUBLIC_API_URL}/${action.payload.information?.profile?.replace('public/', '')}` : null;
        })
        builder.addCase(initial.rejected, (state, action) => {
            console.log(action.error);
            state.loading = false;
        })
        builder.addCase(uploadEditProfile.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(uploadEditProfile.fulfilled, (state, action) => {
            state.phone = action.payload.phone;
            state.name = action.payload.information.name;
            state.email = action.payload.email;
            state.profile = action.payload.information?.profile ? `${process.env.EXPO_PUBLIC_API_URL}/${action.payload.information?.profile?.replace('public/', '')}` : null;
            state.loading = false;
        })
        builder.addCase(uploadEditProfile.rejected, (state, action) => {
            state.loading = false;
            console.log(action);
        })
        builder.addCase(getTransaction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getTransaction.fulfilled, (state, action) => {
            state.loading = false;
            state.transactions = action.payload;
            state.transactionFinish = false;
        })
        builder.addCase(getTransaction.rejected, (state, action) => {
            console.log(action.error);
            state.loading = false;
        })
        builder.addCase(createTransaction.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(createTransaction.fulfilled, (state) => {
            state.loading = false;
            state.transactionFinish = true;
        })
        builder.addCase(createTransaction.rejected, (state, action) => {
            console.log(action.error);
            state.loading = false;
        })
    },
})


// export actions 
export const {
    
} = profileSlice.actions

// export reducer by default 
export default profileSlice.reducer