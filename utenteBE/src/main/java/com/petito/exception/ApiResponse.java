package com.petito.exception;

import java.util.HashMap;
import java.util.Map;

public class ApiResponse<T> {
	private Boolean success;
	private Integer code;
	private String message;
	private String errorMessage; 
	private T data;
	
	private static final Map<Integer,String> CODES = new HashMap<>();
	private static final String DEFAULT_MSG ="Codice di stato non definito";
	
	public static final Integer SUCCESS_GET = 10;
    public static final Integer SUCCESS_POST = 30;
    public static final Integer SUCCESS_PUT = 50;
    public static final Integer SUCCESS_DELETE = 70;
 
    public static final Integer ERROR_GET = 110;
    public static final Integer ERROR_POST = 130;
    public static final Integer ERROR_PUT = 150;
    public static final Integer ERROR_DELETE = 171;
    public static final Integer ERROR_EXISTING_EMAIL = 201;
    public static final Integer ERROR_HTTP = 300;
	
    static {
		CODES.put(SUCCESS_GET, "Operazione GET Completata con successo");
		CODES.put(SUCCESS_POST, "Operazione POST Completata con successo");
		CODES.put(SUCCESS_PUT, "Operazione PUT Completata con successo");
		CODES.put(SUCCESS_DELETE, "Operazione DELETE Completata con successo");
		CODES.put(ERROR_GET, "Errore Operazione GET");
		CODES.put(ERROR_POST, "Errore Operazione POST");
		CODES.put(ERROR_PUT, "Errore Operazione PUT");
		CODES.put(ERROR_DELETE, "Errore Operazione DELETE");
		CODES.put(ERROR_EXISTING_EMAIL, "Errore email già presente in archivio");
		CODES.put(ERROR_HTTP, "Errore generico HTTP");
	}
	
	
	public ApiResponse(Boolean success, Integer code, String errorMessage, T data) {
		super();
		this.success = success;
		this.code = code;
		this.message = CODES.getOrDefault(code, DEFAULT_MSG);		
		this.errorMessage = errorMessage;
		this.data = data;
	}

	public static <T> ApiResponse<T> success(Integer code, T data) {
		
		return new ApiResponse<>(true,code,"",data);
	}
	
    public static <T> ApiResponse<T> error(Integer code, String errorMsg) {
		
		return new ApiResponse<>(false,code,errorMsg,null);
	}
	
    public ApiResponse<T> errorNonStatic(Integer code, String errorMsg) {
		
		return new ApiResponse<>(false,code,errorMsg,null);
	}
    
    
    public static Integer getErrorCodeByMethod(String method) {
    	return switch (method) {
    		case "PUT" -> ERROR_PUT;
    		case "POST" -> ERROR_POST;
    		case "GET" -> ERROR_GET;
    		case "DELETE" -> ERROR_DELETE;
    		default -> ERROR_HTTP;
    	};
    }
    

	public Boolean getSuccess() {
		return success;
	}


	public void setSuccess(Boolean success) {
		this.success = success;
	}


	public Integer getCode() {
		return code;
	}


	public void setCode(Integer code) {
		this.code = code;
	}


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public String getErrorMessage() {
		return errorMessage;
	}


	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}


	public T getData() {
		return data;
	}


	public void setData(T data) {
		this.data = data;
	} 
	
	
	
}
