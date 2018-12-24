package sorting;

public class Selection {
  void sort(int a[]){
	  
	  for(int i=0;i<a.length;i++){
		  int keyData=a[i];
		  int key=i;
		  for(int j= i+i; j<a.length ;j++){
			  if(a[key] > a[j]){
				  
				  key = j;
			  }
			  
			  a[i]=a[key];
			  a[key]= keyData;
		  }
	  }
	  System.out.println("array first element" + a[0]);
  }
  public static void main(String arr[]){
	  int arr1[] = {12, 11, 13, 5, 6};
	  Selection obj = new Selection();
	   obj.sort(arr1);
	   
  }
}
