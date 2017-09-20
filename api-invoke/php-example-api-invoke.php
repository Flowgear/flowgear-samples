<?php

/**
 * @param string $url - the full URL of the Flowgear endpoint you wish to invoke
 * @param string $uid - the Flowgear user account (email address) to authenticate with
 * @param string $pass - the Flowgear user account password
 * @param int $timeout - timeout of the HTTP invoke in seconds
 * @param array $postdata - if you are POSTing, provide an array of key/value pairs. Must be left null for GET requests
 */
function invokeFlowgear($url, $uid, $pass, $timeout, $postdata)
{
    
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); //set to TRUE if you want the certificate properly validated
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_TIMEOUT, $timeout);
    
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
        'Content-Type:application/json'
    )); //this is the default content-type and will need to be adjusted if you are making raw requests (non-JSON) to the API
    
    if ($postdata) //this example assumes HTTP POST if $postdata is supplied, otherwise GET. Remember that the method must match the method you set on the Workflow
        {
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($postdata)); //this sample encodes to JSON. If your Workflow supports a raw request, you can encode appropriately here
    }
    
    curl_setopt($curl, CURLOPT_FAILONERROR, false);
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($curl, CURLOPT_USERPWD, $uid . ":" . $pass);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    
    $response = json_decode(curl_exec($curl));
    
    $responseCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    
    curl_close($curl);
    
    if ($responseCode != 200) {
        if (($response) && ($response->Message))
            throw new Exception($response->Message); //attempt to return the message emitted by the Workflow
        else
            throw new Exception("Server returned HTTP response code " . $responseCode); //otherwise, lower-level errors just cause the HTTP response code to be presented in the error
    }
    
    return $response;
}

$ret = invokeFlowgear("https://yourvanitydomain.flowgear.io/yourrestfulpath/", "flowgearuser@domain.com", "password", 30, array(
    "input1" => "some string value",
    "numericvalue" => 123
));

echo ($ret->responseKey); //the response are key/value pairs of the outputs you've defined in Variable Bars on the workflow

?>