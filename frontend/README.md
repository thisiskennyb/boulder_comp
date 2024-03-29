
# Run Frontend Local

1. Install Dependencies

Make sure you are in your `boulder_comp/frontend` folder

Run the following command
```
npm install
```

2. Run the development server

```
npm run dev
```

[Back to Table of Contents](../README.md#table-of-contents)


# React Toastify Setup

To get started, you will need to install:
```
npm install --save react-toastify
```

Inside App.jsx we want to import ToastContainer and css styling from react-toastify:

```
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

```

Then inside App.jsx, use ToastContainer within Router



Now within a component that we want to use a toast in:

Import toast

```
import { toast } from "react-toastify";
```

An east way to use toast inside your component is to wrap your async fetches in a try catch block.

You can then put something like:

```
toast.success('This will be a green notification with this message')
```

and inside the catch you can similarly put a message, with perhaps toast.error to make it easier to distinguish


# React Select
Helps with searchable input combined with select

```
npm install react-select
```

# Tailwind Forms
Helps make styling for inputs and form elements easier with 