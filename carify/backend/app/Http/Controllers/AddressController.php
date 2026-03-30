<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;

class AddressController extends Controller
{

    // LIST USER ADDRESSES
    public function index(Request $request)
    {
        return response()->json(
            $request->user()->addresses
        );
    }


    // CREATE ADDRESS
    public function store(Request $request)
    {
        $request->validate([
            "label" => "required|string",
            "street" => "required|string",
            "city" => "required|string",
            "state" => "required|string",
            "pincode" => "required|string",
            "phone" => "required|string",
        ]);

        $address = $request->user()
                    ->addresses()
                    ->create($request->all());

        return response()->json($address,201);
    }


    // UPDATE ADDRESS
    public function update(Request $request,$id)
    {
        $address = Address::where("user_id",$request->user()->id)
                        ->findOrFail($id);

        $request->validate([
            "label" => "required|string",
            "street" => "required|string",
            "city" => "required|string",
            "state" => "required|string",
            "pincode" => "required|string",
            "phone" => "required|string",
        ]);

        $address->update($request->all());

        return response()->json($address);
    }


    // DELETE ADDRESS
    public function destroy(Request $request,$id)
    {
        $address = Address::where("user_id",$request->user()->id)
                        ->findOrFail($id);

        $address->delete();

        return response()->json([
            "message"=>"Address deleted"
        ]);
    }

}